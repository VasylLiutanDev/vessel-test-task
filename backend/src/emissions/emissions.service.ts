import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { EmissionLogDto, GetEmissionsQueryDto, EmissionsByVesselDto, EmissionsByDateDto } from './dto/emission.dto';

@Injectable()
export class EmissionsService {
  constructor(private prisma: PrismaService) {}

  async findAll(query: GetEmissionsQueryDto): Promise<EmissionLogDto[]> {
    const { startDate, endDate, vesselId } = query;
    
    const where: any = {};
    
    if (startDate || endDate) {
      where.AND = [];
      if (startDate) {
        where.AND.push({
          fromUtc: {
            gte: new Date(startDate),
          },
        });
      }
      if (endDate) {
        where.AND.push({
          toUtc: {
            lte: new Date(endDate),
          },
        });
      }
    }
    
    if (vesselId) {
      where.vesselId = Number(vesselId);
    }

    return this.prisma.emissionLog.findMany({
      where,
      select: {
        id: true,
        vesselId: true,
        logId: true,
        fromUtc: true,
        toUtc: true,
        met2wco2: true,
        aet2wco2: true,
        totT2wco2: true,
        mew2wco2e: true,
        aew2wco2e: true,
        totW2wco2: true,
      },
      orderBy: {
        fromUtc: 'asc',
      },
    });
  }

  async findOne(id: number): Promise<EmissionLogDto> {
    const emission = await this.prisma.emissionLog.findUnique({
      where: { id },
      select: {
        id: true,
        vesselId: true,
        logId: true,
        fromUtc: true,
        toUtc: true,
        met2wco2: true,
        aet2wco2: true,
        totT2wco2: true,
        mew2wco2e: true,
        aew2wco2e: true,
        totW2wco2: true,
      },
    });

    if (!emission) {
      throw new NotFoundException(`Emission log with ID ${id} not found`);
    }

    return emission;
  }

  async getEmissionsByVessel(query: GetEmissionsQueryDto): Promise<EmissionsByVesselDto[]> {
    const { startDate, endDate } = query;
    
    const where: any = {};
    
    if (startDate || endDate) {
      where.AND = [];
      if (startDate) {
        where.AND.push({
          fromUtc: {
            gte: new Date(startDate),
          },
        });
      }
      if (endDate) {
        where.AND.push({
          toUtc: {
            lte: new Date(endDate),
          },
        });
      }
    }

    const emissions = await this.prisma.emissionLog.groupBy({
      by: ['vesselId'],
      where,
      _sum: {
        totW2wco2: true,
      },
      orderBy: {
        _sum: {
          totW2wco2: 'desc',
        },
      },
    });

    // Get vessel names
    const vesselIds = emissions.map(e => e.vesselId);
    const vessels = await this.prisma.vessel.findMany({
      where: {
        id: { in: vesselIds },
      },
      select: {
        id: true,
        name: true,
      },
    });

    const vesselMap = new Map(vessels.map(v => [v.id, v.name]));

    return emissions.map(e => ({
      vesselId: e.vesselId,
      vesselName: vesselMap.get(e.vesselId) || `Vessel ${e.vesselId}`,
      totalEmissions: e._sum.totW2wco2 || 0,
    }));
  }

  async getEmissionsByDate(query: GetEmissionsQueryDto): Promise<EmissionsByDateDto[]> {
    const { startDate, endDate, vesselId } = query;
    
    const where: any = {};
    
    if (vesselId) {
      where.vesselId = Number(vesselId);
    }
    
    if (startDate || endDate) {
      where.AND = [];
      if (startDate) {
        where.AND.push({
          fromUtc: {
            gte: new Date(startDate),
          },
        });
      }
      if (endDate) {
        where.AND.push({
          toUtc: {
            lte: new Date(endDate),
          },
        });
      }
    }

    // Get all logs with the date part only
    const logs = await this.prisma.emissionLog.findMany({
      where,
      select: {
        fromUtc: true,
        totW2wco2: true,
      },
      orderBy: {
        fromUtc: 'asc',
      },
    });

    // Group by day and sum emissions
    const emissionsByDate = logs.reduce((acc, log) => {
      const dateKey = log.fromUtc.toISOString().split('T')[0];
      if (!acc[dateKey]) {
        acc[dateKey] = 0;
      }
      // Ensure totW2wco2 is treated as a number
      acc[dateKey] += Number(log.totW2wco2) || 0;
      return acc;
    }, {} as Record<string, number>);

    // Convert to array of DTOs with proper typing
    return Object.entries(emissionsByDate).map(([date, totalEmissions]) => ({
      date,
      totalEmissions: Number(totalEmissions) || 0,
    }));
  }
}
