import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';

export const useEmissionsData = () => {
  // Fetch emissions by vessel
  const emissionsByVessel = useQuery({
    queryKey: ['emissionsByVessel'],
    queryFn: async () => {
      console.log('Fetching emissions by vessel...');
      try {
        const data = await api.getEmissionsByVessel({});
        console.log('Emissions by vessel data:', data);
        return data;
      } catch (error) {
        console.error('Error fetching emissions by vessel:', error);
        throw error;
      }
    },
  });

  // Fetch emissions by date
  const emissionsByDate = useQuery({
    queryKey: ['emissionsByDate'],
    queryFn: async () => {
      console.log('Fetching emissions by date...');
      try {
        const data = await api.getEmissionsByDate({});
        console.log('Emissions by date data:', data);
        return data;
      } catch (error) {
        console.error('Error fetching emissions by date:', error);
        throw error;
      }
    },
  });

  // Fetch deviations
  const deviations = useQuery({
    queryKey: ['deviations'],
    queryFn: async () => {
      console.log('Fetching deviations...');
      try {
        const data = await api.getDeviations();
        console.log('Deviations data:', data);
        return data;
      } catch (error) {
        console.error('Error fetching deviations:', error);
        throw error;
      }
    },
  });

  // Log loading and error states
  if (emissionsByVessel.isLoading || emissionsByDate.isLoading || deviations.isLoading) {
    console.log('Loading data...');
  }

  if (emissionsByVessel.error || emissionsByDate.error || deviations.error) {
    console.error('Error in useEmissionsData:', {
      emissionsByVesselError: emissionsByVessel.error,
      emissionsByDateError: emissionsByDate.error,
      deviationsError: deviations.error,
    });
  }

  return {
    emissionsByVessel: emissionsByVessel.data || [],
    emissionsByDate: emissionsByDate.data || [],
    deviations: deviations.data || [],
    isLoading: emissionsByVessel.isLoading || emissionsByDate.isLoading || deviations.isLoading,
    error: emissionsByVessel.error || emissionsByDate.error || deviations.error,
  };
};
