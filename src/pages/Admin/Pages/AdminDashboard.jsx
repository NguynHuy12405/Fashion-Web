import { stats } from "../../../mockData/data";
import Chart from "../componentAdmin/Chart";

export default function DashboardManager() {
  return (
    <>
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {stats.map((s) => (
                <div key={s.label} className="bg-white p-6 rounded-2xl shadow">
                    <h3>{s.label}</h3>
                    <p className="text-3xl font-bold">{s.value}</p>
                </div>
            ))}
        </div>
        {/* Chart */}
        <Chart />
    </>
  )
}
