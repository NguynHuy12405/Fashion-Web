import { useState, useMemo } from "react";
import OrderDetail from "./OrderDetail";
import { useOrderStore } from "../../stores/useOrderStore";
import { useAuthStore } from "../../stores/useAuthStore";

const STATUS_OPTIONS = ["Tất cả", "Đang xử lý", "Hoàn thành", "Đã hủy"];
const PAGE_SIZE = 5;

export default function OrdersPage() {
  const user = useAuthStore((s) => s.user);
  const getOrdersByCurrentUser = useOrderStore((s) => s.getOrdersByCurrentUser);

  const [openOrderId, setOpenOrderId] = useState(null);
  const [statusFilter, setStatusFilter] = useState("Tất cả");
  const [currentPage, setCurrentPage] = useState(1);

  if (!user) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">
          Vui lòng đăng nhập để xem đơn hàng của bạn.
        </p>
      </div>
    );
  }

  const allOrders = getOrdersByCurrentUser();

  // Lọc theo trạng thái
  const filteredOrders = useMemo(() => {
    if (statusFilter === "Tất cả") return allOrders;
    return allOrders.filter((o) => o.status === statusFilter);
  }, [allOrders, statusFilter]);

  // Phân trang
  const totalPages = Math.ceil(filteredOrders.length / PAGE_SIZE);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const toggleOrder = (id) => {
    setOpenOrderId((prev) => (prev === id ? null : id));
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen text-black">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Đơn hàng của tôi</h1>

      {/* Filter */}
      <div className="mb-4 flex items-center gap-4">
        <span className="text-gray-600 text-sm">Lọc theo trạng thái:</span>
        <select
          value={statusFilter}
          onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
          className="px-2 py-1 border border-gray-300 rounded text-sm"
        >
          {STATUS_OPTIONS.map((status) => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
      </div>

      {/* Orders list */}
      <div className="space-y-4">
        {paginatedOrders.length === 0 && (
          <p className="text-gray-500 text-sm">Bạn chưa có đơn hàng nào.</p>
        )}

        {paginatedOrders.map((order) => (
          <div
            key={order.id}
            className="bg-white p-4 rounded-lg shadow-sm border border-gray-200"
          >
            {/* Header */}
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="font-semibold text-gray-700">Mã đơn: {order.id}</p>
                <p className="text-sm text-gray-500">{order.date}</p>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-600">
                {order.status}
              </span>
            </div>

            {/* Tổng tiền + nút xem chi tiết */}
            <div className="flex justify-between items-center">
              <div>
                <span className="text-sm text-gray-500">Tổng tiền:</span>
                <span className="ml-2 font-bold text-blue-600">
                  {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(order.total)}
                </span>
              </div>

              <button
                onClick={() => toggleOrder(order.id)}
                className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition cursor-pointer"
              >
                {openOrderId === order.id ? "Thu gọn" : "Xem chi tiết"}
              </button>
            </div>

            {/* Chi tiết đơn */}
            {openOrderId === order.id && (
              <div className="mt-4 border-t border-gray-200 pt-4 bg-gray-50 rounded-lg">
                <OrderDetail order={order} />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 flex justify-center items-center gap-2">
          <button
            onClick={handlePrevPage}
            className="px-3 py-1 border rounded text-gray-600 hover:bg-gray-100"
            disabled={currentPage === 1}
          >
            Trước
          </button>
          <span className="px-3 py-1 text-sm">
            {currentPage} / {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            className="px-3 py-1 border rounded text-gray-600 hover:bg-gray-100"
            disabled={currentPage === totalPages}
          >
            Sau
          </button>
        </div>
      )}
    </div>
  );
}
