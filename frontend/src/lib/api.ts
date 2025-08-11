import axios from 'axios';

const API_BASE_URL = 'http://localhost:3002';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Common data interfaces
export interface Vessel {
  id: number;
  name: string;
  imo: string;
  vesselType: number;
}

export interface VesselEmissionsData {
  vesselId: number;
  vesselName: string;
  totalEmissions: number;
}

export interface DateEmissionsData {
  date: string;
  totalEmissions: number;
}

export interface DeviationDto {
  vesselId: number;
  vesselName: string;
  date: string;
  actualEmissions: number;
  baselineEmissions: number;
  deviation: number;
}

export interface Vessel {
  id: number;
  name: string;
  imo: string;
  vesselType: number;
}

export interface EmissionLog {
  id: number;
  vesselId: number;
  logId: number;
  fromUtc: string;
  toUtc: string;
  met2wco2: number;
  aet2wco2: number;
  totT2wco2: number;
  mew2wco2e: number;
  aew2wco2e: number;
  totW2wco2: number;
}

export interface DeviationDto {
  vesselId: number;
  vesselName: string;
  date: string;
  actualEmissions: number;
  baselineEmissions: number;
  deviation: number;
}

export const api = {
  // Vessels
  getVessels: async (): Promise<Vessel[]> => {
    const response = await apiClient.get('/vessels');
    return response.data;
  },

  getVesselById: async (id: number): Promise<Vessel> => {
    const response = await apiClient.get(`/vessels/${id}`);
    return response.data;
  },

  // Emissions
  getEmissions: async (params?: {
    startDate?: string;
    endDate?: string;
    vesselId?: number;
  }): Promise<EmissionLog[]> => {
    const response = await apiClient.get('/emissions', { params });
    return response.data;
  },

  getEmissionsByVessel: async (params?: {
    startDate?: string;
    endDate?: string;
  }): Promise<Array<{ vesselId: number; vesselName: string; totalEmissions: number }>> => {
    const response = await apiClient.get('/emissions/by-vessel', { params });
    return response.data;
  },

  getEmissionsByDate: async (params?: {
    startDate?: string;
    endDate?: string;
    vesselId?: number;
  }): Promise<Array<{ date: string; totalEmissions: number }>> => {
    const response = await apiClient.get('/emissions/by-date', { params });
    return response.data;
  },

  // Poseidon Principles
  getDeviations: async (): Promise<DeviationDto[]> => {
    const response = await apiClient.get('/poseidon-principles/deviations');
    return response.data;
  },

  getVesselDeviation: async (vesselId: number, params?: {
    startDate?: string;
    endDate?: string;
  }): Promise<DeviationDto> => {
    const response = await apiClient.get(`/poseidon-principles/deviations/vessel/${vesselId}`, { params });
    return response.data;
  },
};
