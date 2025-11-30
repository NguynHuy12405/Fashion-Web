import { chartData } from "../../../mockData/data";
import { CartesianGrid, Line, Tooltip, XAxis, YAxis, LineChart } from "recharts";


export default function Chart() {
  return (
    <div className="bg-white p-6 rounded-2xl shadow">
        <LineChart width={700} height={300} data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="sale" stroke="#f97316" strokeWidth={3} />
        </LineChart>
    </div>
  )
}
