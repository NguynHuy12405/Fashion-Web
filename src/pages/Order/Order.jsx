
export default function OrdersPage()  {
  // Mock Data
  const orders = [
    {
      id: "DH001",
      date: "2023-10-25",
      status: "completed",
      total: 1500000,
      items: ["Áo thun Polo (x2)", "Quần Jeans (x1)"]
    },
    {
      id: "DH002",
      date: "2023-10-28",
      status: "pending",
      total: 450000,
      items: ["Mũ lưỡi trai (x1)"]
    }
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed':
        return <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Giao thành công</span>;
      case 'pending':
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">Đang xử lý</span>;
      case 'cancelled':
        return <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">Đã hủy</span>;
      default:
        return null;
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Đơn hàng của tôi</h1>
      
      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="font-semibold text-gray-700">Mã đơn: #{order.id}</p>
                <p className="text-sm text-gray-500">{order.date}</p>
              </div>
              {getStatusBadge(order.status)}
            </div>
            
            <div className="border-t border-b border-gray-100 py-3 my-3">
              {order.items.map((item, idx) => (
                <p key={idx} className="text-gray-600 text-sm">• {item}</p>
              ))}
            </div>

            <div className="flex justify-between items-center">
              <div>
                <span className="text-sm text-gray-500">Tổng tiền:</span>
                <span className="ml-2 font-bold text-blue-600">
                  {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.total)}
                </span>
              </div>
              <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition cursor-pointer">
                Xem chi tiết
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

