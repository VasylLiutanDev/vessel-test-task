import { PrismaService } from '../prisma/prisma.service';
import { VesselDto, CreateVesselDto, UpdateVesselDto } from './dto/vessel.dto';
export declare class VesselService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<VesselDto[]>;
    findOne(id: number): Promise<VesselDto>;
    create(createVesselDto: CreateVesselDto): Promise<VesselDto>;
    update(id: number, updateVesselDto: UpdateVesselDto): Promise<VesselDto>;
    remove(id: number): Promise<void>;
}
