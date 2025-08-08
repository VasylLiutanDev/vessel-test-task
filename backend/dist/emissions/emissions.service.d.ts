import { PrismaService } from '../prisma/prisma.service';
import { EmissionLogDto, GetEmissionsQueryDto, EmissionsByVesselDto, EmissionsByDateDto } from './dto/emission.dto';
export declare class EmissionsService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(query: GetEmissionsQueryDto): Promise<EmissionLogDto[]>;
    findOne(id: number): Promise<EmissionLogDto>;
    getEmissionsByVessel(query: GetEmissionsQueryDto): Promise<EmissionsByVesselDto[]>;
    getEmissionsByDate(query: GetEmissionsQueryDto): Promise<EmissionsByDateDto[]>;
}
