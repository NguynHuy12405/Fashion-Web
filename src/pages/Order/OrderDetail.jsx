export default function OrderDetail({ order }) {
  const totalQuantity = order.items.reduce((s, i) => s + i.quantity, 0);

  return (
    <div className="overflow-hidden animate-slideDown p-5 border-t border-gray-200 text-black">
      <h3 className="font-semibold text-gray-800 text-lg mb-2">
        Chi tiết đơn hàng {order.id}
      </h3>

      <div className="grid grid-cols-2 gap-3 text-sm mb-4">
        <p><strong>Khách hàng:</strong> {order.customer}</p>
        <p><strong>Ngày:</strong> {order.date}</p>
        <p><strong>Số lượng:</strong> {totalQuantity} sản phẩm</p>
        <p>
          <strong>Tổng tiền:</strong>{" "}
          <span className="text-blue-600">
            {order.total.toLocaleString()}₫
          </span>
        </p>
        <p><strong>Trạng thái:</strong> {order.status}</p>
      </div>

      <h4 className="font-semibold mb-2">Danh sách sản phẩm</h4>
      <div className="space-y-2">
        {order.items.map((item) => (
          <div
            key={item.id}
            className="flex justify-between bg-white p-3 rounded-lg border"
          >
            <span>{item.nameItem}</span>
            <span className="text-gray-500">x{item.quantity}</span>
          </div>
        ))}
      </div>

      <style>
        {`
          .animate-slideDown {
            animation: slideDown 0.3s ease-out;
          }

          @keyframes slideDown {
            from {
              opacity: 0;
              transform: translateY(-12px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </div>
  );
}
