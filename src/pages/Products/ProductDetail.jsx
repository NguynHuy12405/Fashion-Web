import { useEffect, useState } from 'react';
import { Star, ShoppingCart, Heart, Minus, Plus, Truck, ShieldCheck } from 'lucide-react';
import { useProductStore } from '../../stores/useProductStore';
import { useParams } from 'react-router';

export default function ProductDetail() {
  const detail = useProductStore((s) => s.productDetail);
  const loadProductDetail = useProductStore((s) => s.loadProductDetail);

  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const { id } = useParams();

  const handleQuantity = (type) => {
    if (type === 'dec' && quantity > 1) setQuantity(quantity - 1);
    if (type === 'inc') setQuantity(quantity + 1);
  };

  useEffect(() => {
    loadProductDetail(Number(id));
  }, [id]);

  if (!detail) return <p>Không tìm thấy sản phẩm</p>;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">

          {/* CỘT TRÁI: HÌNH ẢNH */}
          <div className="p-8 bg-white flex flex-col items-center border-r border-gray-100">
            <div className="w-full aspect-square mb-6 rounded-xl overflow-hidden bg-gray-50 relative group">
              <img 
                src={detail.images[selectedImage]} 
                alt="Main product" 
                className="w-full h-full object-cover object-center mix-blend-multiply"
              />
            </div>

            {/* Thumbnails */}
            <div className="flex gap-4 overflow-x-auto w-full pb-2 justify-center">
              {detail.images.map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`w-20 h-20 rounded-lg border-2 overflow-hidden shrink-0 transition-all
                    ${selectedImage === idx ? 'border-indigo-600 ring-2 ring-indigo-100' : 'border-gray-200 hover:border-indigo-400'}`}
                >
                  <img src={img} alt={`thumb-${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* CỘT PHẢI: THÔNG TIN */}
          <div className="p-8 md:p-12 flex flex-col">
            <div className="mb-4">
              <span className="text-indigo-600 font-bold text-sm uppercase tracking-wider bg-indigo-50 px-3 py-1 rounded-full">
                Sản phẩm bán chạy
              </span>
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{detail.name}</h1>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} fill={i < Math.floor(detail.rating) ? "currentColor" : "none"} />
                ))}
              </div>
              <span className="text-gray-500 text-sm">({detail.reviews} đánh giá)</span>
            </div>

            <div className="flex items-end gap-3 mb-8 border-b border-gray-100 pb-8">
              <span className="text-4xl font-bold text-indigo-700">
                {detail.price.toLocaleString('vi-VN')}₫
              </span>

              {/* ✔ FIX originalPrice */}
              <span className="text-lg text-gray-400 line-through mb-1">
                {(detail.originalPrice || detail.price * 1.2).toLocaleString('vi-VN')}₫
              </span>
            </div>

            <p className="text-gray-600 mb-8 leading-relaxed">
              {detail.description}
            </p>

            {/* Số lượng */}
            <div className="flex items-center gap-6 mb-8">
              <span className="font-semibold text-gray-700">Số lượng:</span>
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button onClick={() => handleQuantity('dec')} className="p-3 hover:bg-gray-100 transition"><Minus size={16} /></button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <button onClick={() => handleQuantity('inc')} className="p-3 hover:bg-gray-100 transition"><Plus size={16} /></button>
              </div>
            </div>

            {/* Nút */}
            <div className="flex gap-4 mb-8">
              <button className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-200 transition-all transform hover:-translate-y-1 flex justify-center items-center gap-2">
                <ShoppingCart size={20} />
                Thêm vào giỏ
              </button>
              <button className="px-5 py-4 border-2 border-gray-200 rounded-xl hover:border-red-400 hover:text-red-500 hover:bg-red-50 transition-colors">
                <Heart size={24} />
              </button>
            </div>

            {/* Cam kết */}
            <div className="space-y-3 pt-6 border-t border-gray-100">
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Truck className="text-indigo-600" size={20} />
                <span>Miễn phí vận chuyển toàn quốc</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <ShieldCheck className="text-indigo-600" size={20} />
                <span>Bảo hành chính hãng 12 tháng</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
