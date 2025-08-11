'use client';

import { useEmissionsData } from "@/hooks/useEmissionsData";

export default function Home() {
  console.log('Rendering Home component...');
  const { emissionsByVessel, emissionsByDate, deviations, isLoading, error } = useEmissionsData();
  
  console.log('Home component state:', {
    isLoading,
    error,
    emissionsByVessel: emissionsByVessel?.length ? `${emissionsByVessel.length} items` : 'empty',
    emissionsByDate: emissionsByDate?.length ? `${emissionsByDate.length} items` : 'empty',
    deviations: deviations?.length ? `${deviations.length} items` : 'empty',
  });

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <p className="text-gray-600">Loading vessel emissions data...</p>
      </div>
    );
  }

  if (error) {
    console.error('Error in page component:', error);
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="bg-red-50 border-l-4 border-red-400 p-4 w-full max-w-2xl">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error loading data</h3>
              <div className="mt-2 text-sm text-red-700">
                <p>There was an error loading the emissions data. Please try the following:</p>
                <ul className="list-disc pl-5 mt-1 space-y-1">
                  <li>Make sure the backend server is running at http://localhost:3002</li>
                  <li>Check your network connection</li>
                  <li>Refresh the page to try again</li>
                </ul>
                <details className="mt-2">
                  <summary className="text-sm text-red-600 cursor-pointer">Show error details</summary>
                  <pre className="mt-2 p-2 bg-red-50 rounded text-xs text-red-600 overflow-auto">
                    {error instanceof Error ? error.message : JSON.stringify(error, null, 2)}
                  </pre>
                </details>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="font-sans min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-gray-900">Vessel Emissions Dashboard</h1>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Total Emissions Card */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total Emissions
                  </dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {emissionsByVessel?.reduce((sum, item) => sum + item.totalEmissions, 0).toLocaleString('en-US', {
                        maximumFractionDigits: 2,
                      }) || '0'}
                    </div>
                    <div className="ml-2 flex items-baseline text-sm font-semibold text-blue-600">
                      <span>tonnes CO₂</span>
                    </div>
                  </dd>
                </div>
              </div>
            </div>
          </div>

          {/* Vessels Count Card */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Vessels Tracked
                  </dt>
                  <dd className="text-2xl font-semibold text-gray-900">
                    {emissionsByVessel?.length || '0'}
                  </dd>
                </div>
              </div>
            </div>
          </div>

          {/* Data Points Card */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-purple-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Data Points
                  </dt>
                  <dd className="text-2xl font-semibold text-gray-900">
                    {emissionsByDate?.length || '0'}
                  </dd>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Vessels Table */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Vessel Emissions Summary</h3>
            <p className="mt-1 text-sm text-gray-500">Detailed breakdown of emissions by vessel</p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Vessel
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    IMO Number
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Emissions (tonnes CO₂)
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {emissionsByVessel?.map((vessel) => (
                  <tr key={vessel.vesselId} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {vessel.vesselName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {vessel.vesselId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-500">
                      {vessel.totalEmissions.toLocaleString('en-US', {
                        maximumFractionDigits: 2,
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-gray-50">
                  <td colSpan={2} className="px-6 py-3 text-sm font-medium text-gray-900">
                    Total
                  </td>
                  <td className="px-6 py-3 text-right text-sm font-medium text-gray-900">
                    {emissionsByVessel?.reduce((sum, item) => sum + item.totalEmissions, 0).toLocaleString('en-US', {
                      maximumFractionDigits: 2,
                    })}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Coming Soon Section */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="text-center py-12">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">More Visualizations Coming Soon</h3>
            <p className="mt-1 text-sm text-gray-500">
              We&apos;re working on adding beautiful charts and additional insights to help you analyze vessel emissions data.
            </p>
          </div>
        </div>
      </main>

      <footer className="bg-white mt-12 border-t border-gray-200">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Vessel Emissions Dashboard. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
