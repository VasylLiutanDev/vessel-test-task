import { VesselService } from './vessel.service';
import { VesselDto, CreateVesselDto, UpdateVesselDto } from './dto/vessel.dto';
export declare class VesselController {
    private readonly vesselService;
    constructor(vesselService: VesselService);
    findAll(): Promise<VesselDto[]>;
    findOne(id: number): Promise<VesselDto>;
    create(createVesselDto: CreateVesselDto): Promise<VesselDto>;
    update(id: number, updateVesselDto: UpdateVesselDto): Promise<VesselDto>;
    remove(id: number): Promise<void>;
}
