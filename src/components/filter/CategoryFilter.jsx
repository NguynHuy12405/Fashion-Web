import { ChevronDown } from "lucide-react";
import { useCategoryStore } from "../../stores/useCategoryStore";

export default function CategoryFilter({ expandedGroups, toggleGroup, selectedCategories, handleCategoryToggle }) {
    const { categories } = useCategoryStore();

  return (
    <div>
        <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
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
                const selectedInGroup = items.filter((cat) =>
                    selectedCategories.includes(cat.id)
                ).length;

                return (
                    <div
                        key={groupName}
                        className="border border-gray-200 rounded-lg overflow-hidden"
                    >
                        <button
                            onClick={() => toggleGroup(groupName)}
                            className="w-full flex items-center justify-between p-3 hover:bg-[#F2E6D7] transition-colors"
                        >
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-gray-800">
                                    {groupName}
                                </span>
                                {selectedInGroup > 0 && (
                                    <span className="text-xs bg-[#D2B48C]/20 text-black px-2 py-0.5 rounded-full">
                                        {selectedInGroup}
                                    </span>
                                )}
                            </div>
                            <ChevronDown
                                size={16}
                                className={`text-gray-500 transition-transform ${
                                    isExpanded ? "rotate-180" : ""
                                }`}
                            />
                        </button>

                        {isExpanded && (
                            <div className="px-3 pb-3 space-y-2 bg-gray-50">
                                {items.map((cat) => (
                                    <label
                                        key={cat.id}
                                        className="flex items-center gap-2 cursor-pointer group py-1"
                                    >
                                        <input
                                            type="checkbox"
                                            checked={selectedCategories.includes(
                                                cat.id
                                            )}
                                            onChange={() =>
                                                handleCategoryToggle(cat.id)
                                            }
                                            className="peer hidden"
                                        />
                                        <div className="w-5 h-5 rounded border border-gray-500 bg-gray-200 
                                                        peer-checked:bg-[#D2B48C] peer-checked:border-black transition" />
                                        <span className="text-sm text-gray-700 group-hover:text-black transition-colors">
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
  )
}
