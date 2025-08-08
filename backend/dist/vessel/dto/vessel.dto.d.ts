export declare class VesselDto {
    id: number;
    name: string;
    imoNumber: number;
    vesselType: number;
}
export declare class CreateVesselDto {
    name: string;
    imoNumber: number;
    vesselType: number;
}
export declare class UpdateVesselDto {
    name?: string;
    imoNumber?: number;
    vesselType?: number;
}
