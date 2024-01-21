import { Line } from "react-chartjs-2";
import { Chart } from "chart.js/auto";

function LineChart({ data }) {
  return (
    <div>
      <Line data={data} />
    </div>
  );
}

export default LineChart;
