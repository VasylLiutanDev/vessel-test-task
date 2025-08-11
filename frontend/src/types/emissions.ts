export interface VesselEmissions {
  vesselId: number;
  vesselName: string;
  totalEmissions: number;
}

export interface EmissionsByDate {
  date: string;
  emissions: number;
}

export interface Deviation {
  vesselId: string;
  vesselName: string;
  deviation: number;
  date: string;
}

export interface EmissionsData {
  emissionsByVessel: VesselEmissions[];
  emissionsByDate: EmissionsByDate[];
  deviations: Deviation[];
}
