import { Star, Upload } from "lucide-react";
import { useState } from "react";

export default function AddReviewForm({ onSubmit }) {
  const [rating, setRating] = useState(0);
  const [text, setText] = useState("");
  const [images, setImages] = useState([]);

  const handleImageUpload = (e) => {
    const files = [...e.target.files];
    const newImgs = files.map((file) => URL.createObjectURL(file));
    setImages([...images, ...newImgs]);
  };

  const submitForm = () => {
    if (rating === 0) return alert("Vui lòng chọn số sao.");
    if (text.trim().length < 5) return alert("Vui lòng nhập nội dung.");

    onSubmit({
      rating,
      comment: text,
      images,
      reviewerName: "User",
      reviewerEmail: "user@example.com",
    });

    setRating(0);
    setText("");
    setImages([]);
  };

  return (
    <div className="bg-white max-w-xl mx-auto my-12 p-8 rounded-3xl border border-[#e6e4df] shadow-sm">
      <h3 className="text-2xl font-light text-[#1a1a1a] mb-6 tracking-wide">
        Viết đánh giá của bạn
      </h3>

      {/* Rating */}
      <div className="flex gap-2 mb-6">
        {[1, 2, 3, 4, 5].map((s) => (
          <Star
            key={s}
            size={28}
            onClick={() => setRating(s)}
            className={`cursor-pointer transition 
            ${
              s <= rating
                ? "text-[#d1a854] fill-[#d1a854]"
                : "text-gray-300 hover:text-[#d1a854]"
            }`}
          />
        ))}
      </div>

      {/* Textarea */}
      <textarea
        rows={4}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Chia sẻ trải nghiệm của bạn..."
        className="w-full border border-[#ddd] rounded-2xl p-4 text-[15px] focus:border-[#d1a854] outline-none"
      />

      {/* Upload images */}
      <label
        className="flex items-center gap-2 mt-5 cursor-pointer text-[#1a1a1a] hover:text-[#d1a854]"
      >
        <Upload size={18} />
        <span>Tải ảnh lên</span>
        <input type="file" className="hidden" multiple onChange={handleImageUpload} />
      </label>

      {/* Preview images */}
      {images.length > 0 && (
        <div className="grid grid-cols-3 gap-3 mt-4">
          {images.map((img, i) => (
            <img
              key={i}
              src={img}
              className="w-full h-24 object-cover rounded-xl border border-[#eceae6]"
            />
          ))}
        </div>
      )}

      <button
        onClick={submitForm}
        className="mt-6 w-full bg-[#1a1a1a] text-white py-3 rounded-2xl tracking-wide cursor-pointer
        hover:bg-[#000] transition"
      >
        Gửi đánh giá
      </button>
    </div>
  );
}
