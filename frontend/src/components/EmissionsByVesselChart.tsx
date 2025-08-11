'use client';

import { useRef, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { VesselEmissionsData } from '@/lib/api';

interface EmissionsByVesselChartProps {
  data: VesselEmissionsData[];
}

export default function EmissionsByVesselChart({ data }: EmissionsByVesselChartProps) {
  const chartRef = useRef<HighchartsReact.RefObject>(null);

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.chart.update({
        title: {
          text: '',
        },
        legend: {
          enabled: false,
        },
        credits: {
          enabled: false,
        },
      });
    }
  }, [data]);

  const options: Highcharts.Options = {
    chart: {
      type: 'bar',
      backgroundColor: 'transparent',
    },
    title: {
      text: 'Emissions by Vessel',
      align: 'left',
      style: {
        color: '#1f2937',
        fontWeight: '600',
      },
    },
    xAxis: {
      categories: data.map((item) => item.vesselName),
      title: {
        text: 'Vessel',
      },
      labels: {
        style: {
          color: '#6b7280',
        },
      },
    },
    yAxis: {
      min: 0,
      title: {
        text: 'CO₂ Emissions (tonnes)',
      },
      gridLineColor: '#e5e7eb',
      labels: {
        style: {
          color: '#6b7280',
        },
      },
    },
    tooltip: {
      headerFormat: '<b>{point.key}</b><br/>',
      pointFormat: 'Emissions: {point.y:,.2f} tonnes CO₂',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderColor: '#e5e7eb',
      borderRadius: 8,
      borderWidth: 1,
      shadow: true,
      style: {
        color: '#1f2937',
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        dataLabels: {
          enabled: true,
          format: '{point.y:,.0f} t',
          style: {
            color: '#1f2937',
            textOutline: 'none',
          },
        },
        color: {
          linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
          stops: [
            [0, '#3b82f6'],
            [1, '#1d4ed8'],
          ],
        },
      },
    },
    series: [
      {
        name: 'Emissions',
        type: 'bar',
        data: data.map((item) => ({
          name: item.vesselName,
          y: item.totalEmissions,
        })),
      },
    ],
  };

  return (
    <div className="w-full h-full">
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        ref={chartRef}
        containerProps={{ style: { height: '100%', width: '100%' } }}
      />
    </div>
  );
}
