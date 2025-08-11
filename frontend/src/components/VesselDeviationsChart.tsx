'use client';

import { useRef, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { DeviationDto } from '@/lib/api';

interface VesselDeviationsChartProps {
  data: DeviationDto[];
}

export default function VesselDeviationsChart({ data }: VesselDeviationsChartProps) {
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

  // Sort data by deviation percentage (absolute value)
  const sortedData = [...data].sort((a, b) => 
    Math.abs(b.deviation) - Math.abs(a.deviation)
  );

  const options: Highcharts.Options = {
    chart: {
      type: 'bar',
      backgroundColor: 'transparent',
    },
    title: {
      text: 'Vessel Deviations from Baseline',
      align: 'left',
      style: {
        color: '#1f2937',
        fontWeight: '600',
      },
    },
    xAxis: {
      categories: sortedData.map((item) => item.vesselName),
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
      title: {
        text: 'Deviation from Baseline (%)',
      },
      gridLineColor: '#e5e7eb',
      plotLines: [{
        value: 0,
        color: '#9ca3af',
        width: 1,
        zIndex: 5,
      }],
      labels: {
        style: {
          color: '#6b7280',
        },
        format: '{value}%',
      },
    },
    tooltip: {
      headerFormat: '<b>{point.key}</b><br/>',
      pointFormat: 'Deviation: {point.y:,.1f}%<br/>' +
        'Actual: {point.actual:,.1f} t CO₂<br/>' +
        'Baseline: {point.baseline:,.1f} t CO₂',
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
          format: '{point.y:,.1f}%',
          style: {
            color: '#1f2937',
            textOutline: 'none',
          },
        },
        colorByPoint: true,
      },
      series: {
        states: {
          hover: {
            brightness: 0.1,
          },
        },
      },
    },
    series: [
      {
        name: 'Deviation',
        type: 'bar',
        data: sortedData.map((item) => ({
          name: item.vesselName,
          y: item.deviation,
          actual: item.actualEmissions,
          baseline: item.baselineEmissions,
          color: item.deviation > 0 ? '#ef4444' : '#10b981', // Red for positive (bad), green for negative (good)
        })),
      },
    ],
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 600,
          },
          chartOptions: {
            xAxis: {
              labels: {
                rotation: -45,
                style: {
                  fontSize: '10px',
                },
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
