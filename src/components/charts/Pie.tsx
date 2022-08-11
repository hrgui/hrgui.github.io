import { Chart } from "chart.js";
import { useEffect, useRef } from "preact/hooks";
import { PieController, ArcElement, Tooltip } from "chart.js";

Chart.register(PieController, ArcElement, Tooltip);

//TODO types for data
type Props = {
  data: any;
};

const Pie = ({ data }: Props) => {
  const ref = useRef<HTMLCanvasElement>();

  useEffect(() => {
    if (ref.current && data) {
      new Chart(ref.current.getContext("2d"), {
        type: "pie",
        data,
      });
    }
  }, [ref, data]);

  return (
    <div>
      <canvas ref={ref} height={150} width={300}></canvas>
    </div>
  );
};

export default Pie;
