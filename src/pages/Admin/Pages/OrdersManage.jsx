import { Download, Eye, ChevronDown, Package, CheckCircle, Clock } from 'lucide-react';
import { orders } from '../../../mockData/data';
import StatusBadge from '../../../components/StatusBadge';

const StatCard = ({ label, value, icon: Icon, color }) => (
  <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
    <div className={`p-3 rounded-lg ${color}`}>
      <Icon size={20} className="text-white" />
    </div>
    <div>
      <p className="text-gray-500 text-xs uppercase font-medium">{label}</p>
      <h3 className="text-xl font-bold text-gray-800 mt-1">{value}</h3>
    </div>
  </div>
);

export default function ManageOrders()  {
  
  return (
    <div className="bg-gray-50 min-h-screen p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Đơn hàng</h1>
          <p className="text-gray-500 text-sm mt-1">Theo dõi các đơn hàng mới nhất</p>
        </div>
        <button className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 shadow-sm text-sm font-medium transition-all">
          <Download size={16} /> Xuất báo cáo
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard label="Tổng đơn hàng" value={orders.length} icon={Package} color="bg-blue-500" />
        <StatCard label="Đang chờ xử lý" value="12" icon={Clock} color="bg-yellow-500" />
        <StatCard label="Hoàn thành hôm nay" value="45" icon={CheckCircle} color="bg-green-500" />
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex justify-between items-center">
            <h2 className="font-semibold text-gray-800">Danh sách đơn hàng</h2>
            <div className="flex gap-2">
                {/* Ví dụ về nút lọc trạng thái */}
                <button className="text-xs font-medium text-gray-500 hover:text-blue-600 flex items-center gap-1">
                    Trạng thái: Tất cả <ChevronDown size={14} />
                </button>
            </div>
        </div>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 border-b border-gray-100 text-xs uppercase text-gray-500 font-semibold tracking-wider">
              <th className="px-6 py-4">Mã đơn</th>
              <th className="px-6 py-4">Khách hàng</th>
              <th className="px-6 py-4">Ngày đặt</th>
              <th className="px-6 py-4">Số lượng</th>
              <th className="px-6 py-4">Tổng tiền</th>
              <th className="px-6 py-4">Trạng thái</th>
              <th className="px-6 py-4 text-right">Chi tiết</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50/80 transition-colors">
                <td className="px-6 py-4 font-semibold text-blue-600 hover:underline cursor-pointer">
                  {order.id}
                </td>
                <td className="px-6 py-4">
                    <div className="flex flex-col">
                        <span className="font-medium text-gray-800 text-sm">{order.customer}</span>
                        <span className="text-xs text-gray-400">Khách vãng lai</span>
                    </div>
                </td>
                <td className="px-6 py-4 text-gray-600 text-sm">{order.date}</td>
                <td className="px-6 py-4 text-gray-600 text-sm">{order.items} sản phẩm</td>
                <td className="px-6 py-4 font-medium text-gray-800">{order.total}</td>
                <td className="px-6 py-4">
                  <StatusBadge status={order.status} />
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                    <Eye size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {/* Pagination đơn giản */}
        <div className="p-4 border-t border-gray-100 flex justify-end gap-2">
            <button className="px-3 py-1 border border-gray-200 rounded text-sm text-gray-500 hover:bg-gray-50">Trước</button>
            <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm">1</button>
            <button className="px-3 py-1 border border-gray-200 rounded text-sm text-gray-500 hover:bg-gray-50">2</button>
            <button className="px-3 py-1 border border-gray-200 rounded text-sm text-gray-500 hover:bg-gray-50">Sau</button>
        </div>
      </div>
    </div>
  );
};