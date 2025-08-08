export declare class PPReferenceDto {
    id: number;
    rowId: number;
    category: string;
    vesselType: number;
    size: string;
    traj: string;
    a: number;
    b: number;
    c: number;
    d: number;
    e: number;
}
export declare class DeviationDto {
    vesselId: number;
    vesselName: string;
    date: string;
    actualEmissions: number;
    baselineEmissions: number;
    deviation: number;
}
export declare class CalculateDeviationDto {
    vesselId: number;
    startDate?: string;
    endDate?: string;
}
