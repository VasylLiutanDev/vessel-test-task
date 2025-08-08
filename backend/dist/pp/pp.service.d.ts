import { PrismaService } from '../prisma/prisma.service';
import { PPReferenceDto, DeviationDto, CalculateDeviationDto } from './dto/pp.dto';
export declare class PPService {
    private prisma;
    constructor(prisma: PrismaService);
    getReferences(): Promise<PPReferenceDto[]>;
    getReferenceById(id: number): Promise<PPReferenceDto>;
    calculateDeviation(dto: CalculateDeviationDto): Promise<DeviationDto>;
    calculateAllDeviations(): Promise<DeviationDto[]>;
}
