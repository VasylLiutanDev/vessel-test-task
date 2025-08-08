import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { VesselDto, CreateVesselDto, UpdateVesselDto } from './dto/vessel.dto';

@Injectable()
export class VesselService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<VesselDto[]> {
    return this.prisma.vessel.findMany({
      select: {
        id: true,
        name: true,
        imoNumber: true,
        vesselType: true,
      },
    });
  }

  async findOne(id: number): Promise<VesselDto> {
    const vessel = await this.prisma.vessel.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        imoNumber: true,
        vesselType: true,
      },
    });

    if (!vessel) {
      throw new NotFoundException(`Vessel with ID ${id} not found`);
    }

    return vessel;
  }

  async create(createVesselDto: CreateVesselDto): Promise<VesselDto> {
    return this.prisma.vessel.create({
      data: {
        name: createVesselDto.name,
        imoNumber: createVesselDto.imoNumber,
        vesselType: createVesselDto.vesselType,
      },
      select: {
        id: true,
        name: true,
        imoNumber: true,
        vesselType: true,
      },
    });
  }

  async update(id: number, updateVesselDto: UpdateVesselDto): Promise<VesselDto> {
    try {
      return await this.prisma.vessel.update({
        where: { id },
        data: updateVesselDto,
        select: {
          id: true,
          name: true,
          imoNumber: true,
          vesselType: true,
        },
      });
    } catch (error: any) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Vessel with ID ${id} not found`);
      }
      throw error;
    }
  }

  async remove(id: number): Promise<void> {
    try {
      await this.prisma.vessel.delete({
        where: { id },
      });
    } catch (error: any) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Vessel with ID ${id} not found`);
      }
      throw error;
    }
  }
}
