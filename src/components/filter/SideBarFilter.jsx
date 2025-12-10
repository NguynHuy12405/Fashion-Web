import { Filter, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useCategoryStore } from "../../stores/useCategoryStore";
import PriceFilter from "./PriceFilter";
import RateFilter from "./RateFilter";
import CategoryFilter from "./CategoryFilter";

export default function SideBarFilter() {
    const { loadCategories } = useCategoryStore();
    const [expandedGroups, setExpandedGroups] = useState({});
    const [priceRange, setPriceRange] = useState({ min: "", max: "" });
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedRating, setSelectedRating] = useState(null);

    useEffect(() => {
        loadCategories();
    }, []);

    const toggleGroup = (groupName) =>
        setExpandedGroups((prev) => ({
            ...prev,
            [groupName]: !prev[groupName],
        }));

    const handleCategoryToggle = (catId) =>
        setSelectedCategories((prev) =>
            prev.includes(catId)
                ? prev.filter((id) => id !== catId)
                : [...prev, catId]
        );

    const clearAllFilters = () => {
        setSelectedCategories([]);
        setSelectedRating(null);
        setPriceRange({ min: "", max: "" });
    };

    const hasActiveFilters =
        selectedCategories.length > 0 ||
        selectedRating ||
        priceRange.min ||
        priceRange.max;

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 sticky top-4">
            {/* Header */}
            <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Filter className="text-black" size={20} />
                        <h2 className="font-bold text-lg text-gray-900">
                            Bộ Lọc
                        </h2>
                    </div>
                    {hasActiveFilters && (
                        <button
                            onClick={clearAllFilters}
                            className="text-xs text-[#D2B48C] hover:text-black font-medium flex items-center gap-1"
                        >
                            <X size={14} />
                            Xóa tất cả
                        </button>
                    )}
                </div>
            </div>
            <div className="p-4 space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto modern-scroll">
                {/* Categories */}
                <CategoryFilter expandedGroups={expandedGroups} toggleGroup={toggleGroup} selectedCategories={selectedCategories} handleCategoryToggle={handleCategoryToggle} />

                {/* Price Range */}
                <PriceFilter priceRange={priceRange} setPriceRange={setPriceRange} />

                {/* Rating */}
                <RateFilter selectedRating={selectedRating} setSelectedRating={setSelectedRating} />
            </div>
        </div>
    );
}
