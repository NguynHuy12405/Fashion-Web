import { useEffect, useState } from "react";
import { Star, ShoppingCart, Heart, Minus, Plus, Truck, ShieldCheck } from "lucide-react";
import { useProductStore } from "../../stores/useProductStore";
import { useParams } from "react-router";
import ReviewSection from "../../components/ReviewSection";
import AddReviewForm from "../../components/form/AddReviewForm";

export default function ProductDetail() {
  const detail = useProductStore((s) => s.productDetail);
  const loadProductDetail = useProductStore((s) => s.loadProductDetail);

  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [ setReviews ] = useState([]);
  const [selectedImage, setSelectedImage] = useState(0);
  const { id } = useParams();

  const handleQuantity = (type) => {
    if (type === "dec" && quantity > 1) setQuantity(quantity - 1);
    if (type === "inc") setQuantity(quantity + 1);
  };

  useEffect(() => {
    loadProductDetail(Number(id));
  }, [id]);

  if (!detail) return <p>Không tìm thấy sản phẩm</p>;

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-lg border border-black/10 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">

          {/* IMAGE COLUMN */}
          <div className="p-8 flex flex-col items-center border-r border-black/10 bg-white">
            {/* ZOOM MODAL */}
            <div
              onClick={() => setIsZoomOpen(true)}
              className="w-full aspect-square mb-6 rounded-xl overflow-hidden bg-[#f7f7f7] relative
              group cursor-zoom-in shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <img
                src={detail.images[selectedImage]}
                alt="Main product"
                className="w-full h-full object-cover rounded-xl
                transition-transform duration-700 ease-[cubic-bezier(.4,0,.2,1)]
                group-hover:scale-110"
              />

              {/* OVERLAY NHẸ */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all duration-500"></div>
            </div>

            {isZoomOpen && (
              <div 
                onClick={() => setIsZoomOpen(false)}
                className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center 
                z-[9999] cursor-zoom-out animate-fadeIn"
              >
                <img 
                  src={detail.images[selectedImage]}
                  className="max-w-4xl max-h-[80vh] object-contain rounded-lg shadow-2xl 
                  animate-zoomIn"
                />
              </div>
            )}

            {/* Thumbnail List */}
            <div className="flex gap-4 overflow-x-auto w-full pb-2 justify-center">
              {detail.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`w-20 h-20 rounded-lg border-2 overflow-hidden shrink-0 transition-all
                    ${
                      selectedImage === idx
                        ? "border-black shadow-md"
                        : "border-black/20 hover:border-black"
                    }`}
                >
                  <img src={img} alt={`thumb-${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* INFO COLUMN */}
          <div className="p-8 md:p-12 flex flex-col">

            {/* Badge */}
            <div className="mb-4">
              <span className="text-black text-xs font-semibold uppercase tracking-wide bg-[#D2B48C]/30 px-4 py-1 rounded-full">
                Best Seller
              </span>
            </div>

            {/* Name */}
            <h1 className="text-3xl font-bold text-black mb-3">
              {detail.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    fill={i < Math.floor(detail.rating) ? "currentColor" : "none"}
                  />
                ))}
              </div>
              <span className="text-gray-500 text-sm">
                ({detail.reviewCount} đánh giá)
              </span>
            </div>

            {/* PRICE */}
            <div className="flex items-end gap-3 mb-8 border-b border-black/10 pb-8">
              <span className="text-4xl font-bold text-black">
                {detail.price.toLocaleString("vi-VN")}₫
              </span>

              <span className="text-lg text-gray-400 line-through mb-1">
                {(detail.originalPrice || detail.price * 1.2).toLocaleString("vi-VN")}₫
              </span>
            </div>

            {/* DESCRIPTION */}
            <p className="text-gray-700 mb-8 leading-relaxed">
              {detail.description}
            </p>

            {/* QUANTITY */}
            <div className="flex items-center gap-6 mb-8">
              <span className="font-semibold text-black">Số lượng:</span>
              <div className="flex items-center border border-black/20 rounded-lg">
                <button onClick={() => handleQuantity("dec")} className="p-3 hover:bg-[#f5f5f5] transition cursor-pointer">
                  <Minus size={16} />
                </button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <button onClick={() => handleQuantity("inc")} className="p-3 hover:bg-[#f5f5f5] transition cursor-pointer">
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* BUTTONS */}
            <div className="flex gap-4 mb-10">
              <button className="flex-1 bg-black hover:bg-[#333] text-white font-semibold py-4 rounded-xl transition-all cursor-pointer tracking-wide flex justify-center items-center gap-2">
                <ShoppingCart size={20} /> Thêm vào giỏ
              </button>

              <button className="px-5 py-4 border-2 border-black/20 rounded-xl hover:border-[#D2B48C] cursor-pointer hover:text-[#D2B48C] transition-colors">
                <Heart size={24} />
              </button>
            </div>

            {/* COMMITMENTS */}
            <div className="space-y-3 pt-6 border-t border-black/10">
              <div className="flex items-center gap-3 text-sm text-gray-700">
                <Truck className="text-black" size={20} />
                <span>Miễn phí vận chuyển toàn quốc</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-700">
                <ShieldCheck className="text-black" size={20} />
                <span>Bảo hành chính hãng 12 tháng</span>
              </div>
            </div>

          </div>
        </div>
        <ReviewSection reviews={detail.reviews} />
        <AddReviewForm onSubmit={(newReview) => setReviews((prev) => [...prev, newReview])} />
      </div>
    </div>
  );
}
