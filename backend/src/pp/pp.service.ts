import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PPReferenceDto, DeviationDto, CalculateDeviationDto } from './dto/pp.dto';
import { Decimal } from 'decimal.js';
import { calculatePPSCCBaseline, calculateDeviation } from './utils/pp-calculations.util';

@Injectable()
export class PPService {
  constructor(private prisma: PrismaService) {}

  async getReferences(): Promise<PPReferenceDto[]> {
    return this.prisma.pPReference.findMany({
      orderBy: [
        { vesselType: 'asc' },
        { traj: 'asc' },
      ],
    });
  }

  async getReferenceById(id: number): Promise<PPReferenceDto> {
    const reference = await this.prisma.pPReference.findUnique({
      where: { id },
    });

    if (!reference) {
      throw new NotFoundException(`PP reference with ID ${id} not found`);
    }

    return reference;
  }

  async calculateDeviation(
    dto: CalculateDeviationDto,
  ): Promise<DeviationDto> {
    // Get vessel information
    const vessel = await this.prisma.vessel.findUnique({
      where: { id: dto.vesselId },
      select: { id: true, name: true, vesselType: true },
    });

    if (!vessel) {
      throw new NotFoundException(`Vessel with ID ${dto.vesselId} not found`);
    }

    // Get the latest emission log for the vessel
    const where: any = { vesselId: dto.vesselId };
    
    if (dto.startDate || dto.endDate) {
      where.AND = [];
      if (dto.startDate) {
        where.AND.push({
          fromUtc: {
            gte: new Date(dto.startDate),
          },
        });
      }
      if (dto.endDate) {
        where.AND.push({
          toUtc: {
            lte: new Date(dto.endDate),
          },
        });
      }
    }

    const latestEmission = await this.prisma.emissionLog.findFirst({
      where,
      orderBy: {
        toUtc: 'desc',
      },
      select: {
        toUtc: true,
        totW2wco2: true,
      },
    });

    if (!latestEmission) {
      throw new NotFoundException(
        `No emission data found for vessel ${vessel.name}`,
      );
    }

    // Get PP reference data for the vessel type
    const ppReference = await this.prisma.pPReference.findFirst({
      where: {
        vesselType: vessel.vesselType,
        traj: 'MIN', // Using minimum baseline for calculation
      },
    });

    if (!ppReference) {
      throw new NotFoundException(
        `PP reference data not found for vessel type ${vessel.vesselType}`,
      );
    }

    // Get vessel's DWT (deadweight tonnage)
    // Note: In a real application, this would come from the vessel's details
    // For now, we'll use a default value or you can add this to the vessel model
    const defaultDWT = new Decimal(100000); // Default DWT in tons

    // Calculate baseline emissions
    const year = new Date(latestEmission.toUtc).getFullYear();
    const baselineEmissions = calculatePPSCCBaseline(
      {
        a: new Decimal(ppReference.a),
        b: new Decimal(ppReference.b),
        c: new Decimal(ppReference.c),
        d: new Decimal(ppReference.d),
        e: new Decimal(ppReference.e),
      },
      year,
      defaultDWT,
    );

    // Calculate deviation
    const actualEmissions = new Decimal(latestEmission.totW2wco2);
    const { percentage: deviationPercentage } = calculateDeviation(
      actualEmissions,
      baselineEmissions,
    );

    return {
      vesselId: vessel.id,
      vesselName: vessel.name,
      date: latestEmission.toUtc.toISOString().split('T')[0],
      actualEmissions: actualEmissions.toNumber(),
      baselineEmissions: baselineEmissions.toNumber(),
      deviation: deviationPercentage,
    };
  }

  async calculateAllDeviations(): Promise<DeviationDto[]> {
    // Get all vessels
    const vessels = await this.prisma.vessel.findMany({
      select: { id: true, name: true, vesselType: true },
    });

    // Calculate deviation for each vessel
    const deviations: DeviationDto[] = [];
    
    for (const vessel of vessels) {
      try {
        const deviation = await this.calculateDeviation({
          vesselId: vessel.id,
        });
        deviations.push(deviation);
      } catch (error: any) {
        console.error(`Error calculating deviation for vessel ${vessel.id}:`, error.message);
        // Skip this vessel if there's an error
      }
    }

    return deviations;
  }
}
