import { CategoryScale, Chart, LinearScale, LineElement, PointElement, Title } from "chart.js";
import { GeistSans } from "geist/font/sans";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

Chart.register(LineElement, PointElement, LinearScale, Title, CategoryScale);

export default function LatencyGraph({ latencies }: { latencies: number[] }) {
  const options = {
    chart: {
      height: "36%",
      type: "line",
      backgroundColor: "transparent",
      style: {
        fontFamily: GeistSans.style.fontFamily,
      },
    },

    title: {
      style: {
        display: "none",
      },
    },
    xAxis: {
      visible: false,
    },
    yAxis: {
      title: {
        enabled: false,
      },
      labels: {
        style: {
          color: "var(--muted-foreground)",
        },
      },
      gridLineColor: "var(--chart-3)",
      tickPixelInterval: 50,
    },
    legend: {
      enabled: false,
    },
    series: [
      {
        name: "Latency",
        data: latencies,
        color: "var(--chart-2)",
        marker: {
          lineColor: "var(--chart-1)",
        },
      },
    ],
    credits: {
      enabled: false,
    },
    tooltip: {
      backgroundColor: "var(--chart-3)",
      borderColor: "var(--chart-2)",
      shadow: false,
      headerFormat: "",
      valueDecimals: 2,
      valueSuffix: "ms",
      style: {
        color: "white",
      },
    },
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
}
