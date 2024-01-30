/* eslint-disable react/prop-types */
import { Line } from "react-chartjs-2";
// eslint-disable-next-line no-unused-vars
import { Chart } from "chart.js/auto";

function LineChart({ data }) {
  return (
    <div className="h-[380px] justify-center flex">
      <Line data={data} />
    </div>
  );
}

export default LineChart;
