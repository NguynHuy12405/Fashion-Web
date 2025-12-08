import { Link } from "react-router-dom";
import { useCartStore } from "../stores/useCartStore";
import { CreditCard, ShoppingCart, Star } from "lucide-react";

export default function ProductCard({ product }) {
  const addToCart = useCartStore((state) => state.addToCart);

  // SAFE DATA
  const image = product.image || "/no-image.png";
  const rating = Number(product.rating) || 0;
  const reviewCount = product.reviewCount ?? 0;
  const price = Number(product.price) || 0;
  const discount = Number(product.discountPercentage) || 0;
  const salePrice = discount > 0 ? Math.round(price * (1 - discount / 100)) : price;

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100 overflow-hidden flex flex-col group">

      {/* IMAGE */}
      <div className="relative overflow-hidden aspect-square">
        <img
          src={image}
          alt={product.name}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
        />

        {discount > 0 && (
          <div className="absolute top-2 right-2 bg-red-600 px-2 py-1 rounded-md text-xs font-bold text-white shadow-sm">
            -{discount}%
          </div>
        )}
      </div>

      <div className="p-4 flex-1 flex flex-col">
        {/* Category */}
        <div className="text-xs text-gray-500 mb-1 uppercase tracking-wide">
          {product.category}
        </div>

        {/* Name */}
        <h3 className="font-semibold text-gray-800 text-lg mb-2 line-clamp-2 hover:text-orange-600 transition-colors">
          <Link className="font-semibold whitespace-nowrap" to={`/products/${product.id}`}>{product.name}</Link>
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3 text-sm">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < Math.round(rating)
                  ? "text-yellow-400 fill-yellow-400"
                  : "text-gray-300"
              }`}
            />
          ))}
          <span className="text-gray-600 ml-1">{rating}</span>
          <span className="text-xs text-gray-400 ml-1">({reviewCount} đánh giá)</span>
        </div>

        {/* PRICE */}
        <div className="mt-auto">
          <div className="flex items-center gap-2 mb-4">
            <div className="text-xl font-bold text-red-700">
              {salePrice.toLocaleString("vi-VN")} ₫
            </div>

            {discount > 0 && (
              <div className="text-sm line-through text-gray-400">
                {price.toLocaleString("vi-VN")} ₫
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => addToCart(product)}
              className="flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 text-white py-2 rounded-lg text-sm font-medium shadow-md hover:shadow-lg"
            >
              <CreditCard size={16} /> Mua ngay
            </button>

            <button
              onClick={() => addToCart(product)}
              className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 rounded-lg text-sm font-medium"
            >
              <ShoppingCart size={16} /> Thêm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
