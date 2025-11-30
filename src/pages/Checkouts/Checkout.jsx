import { useState } from "react";
import { CreditCard, Truck, MapPin, ShoppingBag } from "lucide-react";
import { useCartStore } from "../../stores/useCartStore";

export default function Checkout() {
  const cartItems = useCartStore((state) => state.cartItems);
  const [payment, setPayment] = useState("cod");
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="max-w-5xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-8 text-black">
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
            <Truck /> Thông tin giao hàng
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" placeholder="Họ tên" className="border p-3 rounded-xl w-full" />
            <input type="text" placeholder="Số điện thoại" className="border p-3 rounded-xl w-full" />
            <input type="email" placeholder="Email" className="border p-3 rounded-xl w-full" />
            <input type="text" placeholder="Địa chỉ" className="border p-3 rounded-xl w-full md:col-span-2" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
            <CreditCard /> Phương thức thanh toán
          </h2>
          <div className="space-y-3">
            <label className="flex items-center gap-3 p-3 border rounded-xl cursor-pointer">
              <input
                type="radio"
                checked={payment === "cod"}
                onChange={() => setPayment("cod")}
              />
              Thanh toán khi nhận hàng (COD)
            </label>
            <label className="flex items-center gap-3 p-3 border rounded-xl cursor-pointer">
              <input
                type="radio"
                checked={payment === "bank"}
                onChange={() => setPayment("bank")}
              />
              Chuyển khoản ngân hàng
            </label>
          </div>
        </div>
      </div>

      {/* RIGHT - Order Summary */}
      <div className="bg-white p-6 rounded-2xl shadow h-fit">
        <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
          <ShoppingBag /> Đơn hàng của bạn
        </h2>

        <div className="space-y-4 mb-6">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center gap-4">
              <img src={item.image} className="w-16 h-16 rounded-xl" />
              <div className="flex-1">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-gray-500 text-sm">SL: {item.quantity}</p>
              </div>
              <p className="font-semibold">{item.price.toLocaleString()} đ</p>
            </div>
          ))}
        </div>

        <div className="border-t pt-4 space-y-2">
          <div className="flex justify-between text-lg font-semibold">
            <span>Tổng cộng</span>
            <span>{total.toLocaleString()} đ</span>
          </div>
        </div>

        <button className="w-full mt-6 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl text-lg transition">
          Xác nhận đặt hàng
        </button>
      </div>
    </div>
  );
}