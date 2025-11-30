import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";
import { chartData } from "../../../mockData/data";

// 1. Tạo Custom Tooltip để hiển thị thông tin đẹp hơn
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-100 shadow-lg rounded-lg text-sm">
        <p className="font-bold text-gray-700 mb-1">{label}</p>
        <p className="text-orange-500 font-medium">
          Doanh thu: {payload[0].value.toLocaleString()} 
        </p>
      </div>
    );
  }
  return null;
};

export default function Chart() {
  return (
    <div className="w-full h-[350px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={chartData}
          margin={{
            top: 10,
            right: 10,
            left: -20,
            bottom: 0,
          }}
        >
          {/* Grid: Ẩn đường dọc, làm mờ đường ngang */}
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
          
          {/* Trục X: Ẩn đường kẻ trục, chỉnh màu chữ */}
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#6b7280', fontSize: 12 }} 
            dy={10}
          />
          
          {/* Trục Y: Tương tự trục X */}
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#6b7280', fontSize: 12 }} 
          />
          
          {/* Tooltip tùy chỉnh */}
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#f97316', strokeWidth: 1, strokeDasharray: '3 3' }} />
          
          {/* Đường Line: Thêm activeDot để khi hover sẽ có chấm tròn đẹp */}
          <Line 
            type="monotone" 
            dataKey="sale" 
            stroke="#f97316" 
            strokeWidth={3} 
            dot={{ r: 0 }} // Ẩn chấm tròn mặc định (chỉ hiện line cho mượt)
            activeDot={{ r: 6, strokeWidth: 0, fill: '#f97316' }} // Khi hover mới hiện chấm
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}