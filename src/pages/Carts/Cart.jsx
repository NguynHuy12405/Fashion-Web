import { Link, useNavigate } from 'react-router';
import { useCartStore } from '../../stores/useCartStore';

export default function Cart() {
  const cartItems = useCartStore((state) => state.cartItems);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const clearCart = useCartStore((state) => state.clearCart);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <section className="pt-[100px] pb-12 bg-white h-[485px]">
        <div className="container mx-auto px-4 text-center">
          <p className="text-2xl text-black mb-4">Giỏ hàng của bạn trống...!</p>
          <Link to="/" className="bg-orange-600 hover:bg-orange-800 text-white px-6 py-2 rounded-lg transition inline-block">
            Tiếp tục mua sắm
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">Giỏ hàng của bạn</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-black">
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="border rounded-lg p-4 flex justify-between items-center">
                  <div className="flex items-center space-x-4 flex-1">
                    <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                    <div>
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-gray-600">{Number(item.price).toLocaleString('vi-VN')}₫</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center border rounded">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-3 py-1 hover:bg-gray-200 cursor-pointer"
                      >
                        -
                      </button>
                      <span className="px-4 py-1">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-3 py-1 hover:bg-gray-200 cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                    <span className="font-semibold w-24 text-right">
                      {(Number(item.price) * item.quantity).toLocaleString('vi-VN')}₫
                    </span>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-600 hover:text-red-800 font-semibold cursor-pointer"
                    >
                      Xóa
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-6 h-fit text-black">
            <h3 className="text-lg font-bold mb-4">Tóm tắt đơn hàng</h3>
            <div className="space-y-3 mb-4 pb-4 border-b">
              <div className="flex justify-between">
                <span>Tạm tính:</span>
                <span>{getTotalPrice().toLocaleString('vi-VN')}₫</span>
              </div>
              <div className="flex justify-between">
                <span>Phí vận chuyển:</span>
                <span className="text-green-600">Miễn phí</span>
              </div>
            </div>
            <div className="flex justify-between text-xl font-bold mb-6">
              <span>Tổng cộng:</span>
              <span>{getTotalPrice().toLocaleString('vi-VN')}₫</span>
            </div>
            <button onClick={() => navigate("/checkout")} className="w-full bg-orange-600 hover:bg-orange-700  py-3 rounded-lg font-semibold transition mb-2 cursor-pointer">
              Thanh toán
            </button>
            <button
              onClick={clearCart}
              className="w-full border border-gray-300 hover:bg-gray-100 py-3 rounded-lg transition cursor-pointer"
            >
              Xóa giỏ hàng
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
