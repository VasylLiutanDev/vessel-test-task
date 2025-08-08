export declare class EmissionLogDto {
    id: number;
    vesselId: number;
    logId: bigint;
    fromUtc: Date;
    toUtc: Date;
    met2wco2: number;
    aet2wco2: number;
    totT2wco2: number;
    mew2wco2e: number;
    aew2wco2e: number;
    totW2wco2: number;
}
export declare class GetEmissionsQueryDto {
    startDate?: string;
    endDate?: string;
    vesselId?: number;
}
export declare class EmissionsByVesselDto {
    vesselId: number;
    vesselName: string;
    totalEmissions: number;
}
export declare class EmissionsByDateDto {
    date: string;
    totalEmissions: number;
}
