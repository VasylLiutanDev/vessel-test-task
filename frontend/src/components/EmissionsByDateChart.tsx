'use client';

import { useRef, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { DateEmissionsData } from '@/lib/api';

interface EmissionsByDateChartProps {
  data: DateEmissionsData[];
}

export default function EmissionsByDateChart({ data }: EmissionsByDateChartProps) {
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

  // Sort data by date
  const sortedData = [...data].sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const options: Highcharts.Options = {
    chart: {
      type: 'spline',
      backgroundColor: 'transparent',
    },
    title: {
      text: 'Emissions Over Time',
      align: 'left',
      style: {
        color: '#1f2937',
        fontWeight: '600',
      },
    },
    xAxis: {
      type: 'datetime',
      title: {
        text: 'Date',
      },
      labels: {
        format: '{value:%b %d}',
        style: {
          color: '#6b7280',
        },
      },
    },
    yAxis: {
      title: {
        text: 'CO₂ Emissions (tonnes)',
      },
      min: 0,
      gridLineColor: '#e5e7eb',
      labels: {
        style: {
          color: '#6b7280',
        },
      },
    },
    tooltip: {
      headerFormat: '<b>{point.x:%A, %b %e, %Y}</b><br/>',
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
      spline: {
        marker: {
          enabled: true,
          radius: 4,
          lineColor: '#3b82f6',
          lineWidth: 2,
          fillColor: '#ffffff',
        },
        lineWidth: 3,
        states: {
          hover: {
            lineWidth: 4,
          },
        },
      },
    },
    series: [
      {
        name: 'Emissions',
        type: 'spline',
        color: '#3b82f6',
        data: sortedData.map((item) => ({
          x: new Date(item.date).getTime(),
          y: item.totalEmissions,
        })),
      },
    ],
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500,
          },
          chartOptions: {
            xAxis: {
              labels: {
                format: '{value:%m/%d}',
              },
            },
          },
        },
      ],
    },
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
