import { Filter, Star } from "lucide-react";
import { useCategoryStore } from "../stores/useCategoryStore";

export default function SideBarFilter() {
    const categories = useCategoryStore((s) => s.categories);

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-4">
            <div className="flex items-center gap-2 mb-4 border-b pb-4">
                <Filter className="text-orange-600" size={20} />
                <h2 className="font-bold text-lg text-gray-800">Bộ Lọc</h2>
            </div>

            {/* Danh mục */}
            <div className="mb-6">
                <h3 className="font-semibold text-gray-700 mb-3">Danh mục</h3>
                <ul className="space-y-2">
                    {categories.map((cat) => (
                    <li key={cat.id}>
                        <label className="flex items-center space-x-2 cursor-pointer group">
                            <input type="checkbox" className="form-checkbox rounded text-orange-600 focus:ring-orange-500 h-4 w-4" />
                            <span className="text-gray-600 group-hover:text-orange-600 transition-colors">{cat.categoryName}</span>
                        </label>
                    </li>
                    ))}
                </ul>
            </div>

            {/* Khoảng giá */}
            <div className="mb-6">
                <h3 className="font-semibold text-gray-700 mb-3">Khoảng giá</h3>
                <div className="flex gap-2 items-center mb-4">
                    <input type="number" placeholder="Từ" className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500" />
                    <span>-</span>
                    <input type="number" placeholder="Đến" className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500" />
                </div>
                <button className="w-full bg-orange-50 text-orange-700 font-medium py-2 rounded-lg hover:bg-orange-100 transition-colors">
                    Áp dụng
                </button>
            </div>

            {/* Đánh giá */}
            <div>
                <h3 className="font-semibold text-gray-700 mb-3">Đánh giá</h3>
                {[5, 4, 3, 2, 1].map((star) => (
                    <div key={star} className="flex items-center gap-2 mb-2 cursor-pointer hover:opacity-80">
                        <div className="flex">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} size={14} className={i < star ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} />
                            ))}
                        </div>
                        <span className="text-xs text-gray-500">trở lên</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
