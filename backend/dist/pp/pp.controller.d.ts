import { PPService } from './pp.service';
import { PPReferenceDto, DeviationDto, CalculateDeviationDto } from './dto/pp.dto';
export declare class PPController {
    private readonly ppService;
    constructor(ppService: PPService);
    getReferences(): Promise<PPReferenceDto[]>;
    getReferenceById(id: number): Promise<PPReferenceDto>;
    calculateAllDeviations(): Promise<DeviationDto[]>;
    calculateDeviation(dto: CalculateDeviationDto): Promise<DeviationDto>;
    getVesselDeviation(vesselId: number, startDate?: string, endDate?: string): Promise<DeviationDto>;
}
