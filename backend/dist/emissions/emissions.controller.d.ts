import { EmissionsService } from './emissions.service';
import { EmissionLogDto, GetEmissionsQueryDto, EmissionsByVesselDto, EmissionsByDateDto } from './dto/emission.dto';
export declare class EmissionsController {
    private readonly emissionsService;
    constructor(emissionsService: EmissionsService);
    findAll(query: GetEmissionsQueryDto): Promise<EmissionLogDto[]>;
    getEmissionsByVessel(query: GetEmissionsQueryDto): Promise<EmissionsByVesselDto[]>;
    getEmissionsByDate(query: GetEmissionsQueryDto): Promise<EmissionsByDateDto[]>;
    findOne(id: number): Promise<EmissionLogDto>;
}
