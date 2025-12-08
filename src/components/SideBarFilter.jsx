import { Filter, Star, ChevronDown, X } from "lucide-react";
import { useCategoryStore } from "../stores/useCategoryStore";
import { useEffect, useState } from "react";
import { option_Price } from "../mockData/data";

export default function SideBarFilter() {
    const { categories, loadCategories } = useCategoryStore();
    const [expandedGroups, setExpandedGroups] = useState({});
    const [priceRange, setPriceRange] = useState({ min: "", max: "" });
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedRating, setSelectedRating] = useState(null);
    

    useEffect(() => {
        loadCategories();
    }, [loadCategories]);

    const toggleGroup = (groupName) => {
        setExpandedGroups(prev => ({
            ...prev,
            [groupName]: !prev[groupName]
        }));
    };

    const handleCategoryToggle = (catId) => {
        setSelectedCategories(prev => 
            prev.includes(catId) 
                ? prev.filter(id => id !== catId)
                : [...prev, catId]
        );
    };

    const clearAllFilters = () => {
        setSelectedCategories([]);
        setSelectedRating(null);
        setPriceRange({ min: "", max: "" });
    };

    const hasActiveFilters = selectedCategories.length > 0 || selectedRating || priceRange.min || priceRange.max;

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 sticky top-4">
            {/* Header */}
            <div className="p-4 border-b border-gray-100">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Filter className="text-orange-600" size={20} />
                        <h2 className="font-bold text-lg text-gray-800">Bộ Lọc</h2>
                    </div>
                    {hasActiveFilters && (
                        <button 
                            onClick={clearAllFilters}
                            className="text-xs text-orange-600 hover:text-orange-700 font-medium flex items-center gap-1"
                        >
                            <X size={14} />
                            Xóa tất cả
                        </button>
                    )}
                </div>
            </div>

            <div className="p-4 space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto modern-scroll">
                <div>
                    <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                        <span>Danh mục</span>
                        <span className="text-xs text-gray-400">
                            ({selectedCategories.length})
                        </span>
                    </h3>
                    
                    <div className="space-y-2">
                        {Object.keys(categories).map((groupName) => {
                            const items = categories[groupName];
                            if (!items || items.length === 0) return null;

                            const isExpanded = expandedGroups[groupName];
                            const selectedInGroup = items.filter(cat => 
                                selectedCategories.includes(cat.id)
                            ).length;

                            return (
                                <div key={groupName} className="border border-gray-200 rounded-lg overflow-hidden">
                                    {/* Group Header */}
                                    <button
                                        onClick={() => toggleGroup(groupName)}
                                        className="w-full flex items-center justify-between p-3 hover:bg-gray-50 transition-colors"
                                    >
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-medium text-gray-700">
                                                {groupName}
                                            </span>
                                            {selectedInGroup > 0 && (
                                                <span className="text-xs bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full">
                                                    {selectedInGroup}
                                                </span>
                                            )}
                                        </div>
                                        <ChevronDown 
                                            size={16} 
                                            className={`text-gray-400 transition-transform ${
                                                isExpanded ? 'rotate-180' : ''
                                            }`}
                                        />
                                    </button>

                                    {/* Group Items */}
                                    {isExpanded && (
                                        <div className="px-3 pb-3 space-y-2 bg-gray-50">
                                            {items.map((cat) => (
                                                <label 
                                                    key={cat.id} 
                                                    className="flex items-center gap-2 cursor-pointer group py-1"
                                                >
                                                    <input 
                                                        type="checkbox" 
                                                        checked={selectedCategories.includes(cat.id)}
                                                        onChange={() => handleCategoryToggle(cat.id)}
                                                        className="peer hidden" 
                                                    />
                                                    <div className="w-5 h-5 rounded bg-gray-200 border border-gray-400 peer-checked:bg-blue-600 peer-checked:border-blue-600 transition" />
                                                    <span className="text-sm text-gray-600 group-hover:text-orange-600 transition-colors">
                                                        {cat.name}
                                                    </span>
                                                </label>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Khoảng giá */}
                <div>
                    <h3 className="font-semibold text-gray-700 mb-3">Khoảng giá</h3>
                    <div className="space-y-3">
                        <div className="flex gap-2 items-center">
                            <div className="flex-1">
                                <input 
                                    type="number" 
                                    placeholder="Từ"
                                    value={priceRange.min}
                                    onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent" 
                                />
                            </div>
                            <span className="text-gray-400">—</span>
                            <div className="flex-1">
                                <input 
                                    type="number" 
                                    placeholder="Đến"
                                    value={priceRange.max}
                                    onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent" 
                                />
                            </div>
                        </div>

                        {/* Price filters */}
                        <div className="grid grid-cols-2 gap-2">
                            {option_Price.map((range, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setPriceRange({ 
                                        min: range.min || "", 
                                        max: range.max || "" 
                                    })}
                                    className="text-xs py-2 px-3 border border-gray-300 rounded-lg hover:border-orange-400 hover:text-orange-600 transition-colors"
                                >
                                    {range.label}
                                </button>
                            ))}
                        </div>

                        <button className="w-full bg-orange-600 text-white font-medium py-2.5 rounded-lg hover:bg-orange-700 transition-colors shadow-sm">
                            Áp dụng giá
                        </button>
                    </div>
                </div>

                {/* Đánh giá */}
                <div>
                    <h3 className="font-semibold text-gray-700 mb-3">Đánh giá</h3>
                    <div className="space-y-2">
                        {[5, 4, 3, 2, 1].map((star) => (
                            <label 
                                key={star} 
                                className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-all ${
                                    selectedRating === star 
                                        ? 'bg-orange-50 border border-orange-200' 
                                        : 'hover:bg-gray-50 border border-transparent'
                                }`}
                            >
                                <input 
                                    type="radio" 
                                    name="rating" 
                                    value={star}
                                    checked={selectedRating === star}
                                    onChange={() => setSelectedRating(star)}
                                    className="peer hidden"
                                />
                                <div className="w-4 h-4 rounded-full bg-gray-200 border border-gray-400  peer-checked:bg-orange-600 peer-checked:border-orange-600 transition" />
                                <div className="flex items-center gap-1.5">
                                    <div className="flex">
                                        {[...Array(5)].map((_, i) => (
                                            <Star 
                                                key={i} 
                                                size={16} 
                                                className={i < star ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} 
                                            />
                                        ))}
                                    </div>
                                    <span className="text-sm text-gray-600">trở lên</span>
                                </div>
                            </label>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}