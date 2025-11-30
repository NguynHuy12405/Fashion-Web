import { Link } from "react-router";
import { useCartStore } from "../stores/useCartStore";
import { CreditCard, ShoppingCart, Star } from "lucide-react";
import { useProductStore } from "../stores/useProductStore";

export default function ProductCard({product}) {
    const addToCart = useCartStore((state) => state.addToCart);
    const getCategoryName = useProductStore(s => s.getCategoryName);


  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100 overflow-hidden flex flex-col group">
        {/* Hình ảnh */}
        <div className="relative overflow-hidden aspect-square">
            <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute top-2 right-2 bg-red-600 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-bold text-white shadow-sm">
                -{Math.floor(Math.random() * 20 + 5)}%
            </div>
        </div>

        {/* Thông tin */}
        <div className="p-4 flex-1 flex flex-col">
            <div className="text-xs text-gray-500 mb-1 uppercase tracking-wide">{getCategoryName(product.categoryId)}</div>
            <h3 className="font-semibold text-gray-800 text-lg mb-2 line-clamp-2 hover:text-orange-600 cursor-pointer transition-colors">
                <Link to={`/products/${product.id}`}>{product.name}</Link>
            </h3>
        
            {/* Rating */}
            <div className="flex items-center mb-3">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
                <span className="text-xs text-gray-400 ml-2">({product.reviews} đánh giá)</span>
            </div>

        {/* Giá và Nút bấm */}
            <div className="mt-auto">
                <div className="text-xl font-bold text-red-700 mb-4">
                    {parseInt(product.price).toLocaleString('vi-VN')} ₫
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                    <button onClick={() => addToCart(product)} className="flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 text-white py-2 rounded-lg text-sm font-medium transition-colors shadow-md hover:shadow-lg cursor-pointer">
                        <CreditCard size={16} /> Mua ngay
                    </button>
                    <button onClick={() => addToCart(product)} className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer">
                        <ShoppingCart size={16} /> Thêm
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}
