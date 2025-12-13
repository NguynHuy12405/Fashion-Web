import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useCategoryStore } from "../../stores/useCategoryStore";

export default function NavBarList() {
  const { categories, loadCategories, loading } = useCategoryStore();

  useEffect(() => {
    loadCategories();
  }, []);

  return (
    <nav className="text-[#0a0d1a] flex justify-around items-center p-2">
      <ul className="flex space-x-4">

        {Object.keys(categories).map((group) => {
          const items = categories[group];
          if (!Array.isArray(items) || items.length === 0) return null;

          return (
            <li key={group} className="relative group">
              {/* Menu Title */}
              <Link to="" className="flex items-center gap-2 cursor-pointer hover:underline transition font-normal text-sm ">
                {group}
              </Link>
              
              {/* Mega Dropdown */}
              <div 
                className="absolute left-0 mt-3 bg-[#ffffff] shadow-xl rounded-xl p-5 min-w-[220px] z-50 opacity-0 invisible 
                group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-out translate-y-4 group-hover:translate-y-0 scale-95 group-hover:scale-100"
              >
                {loading && (
                  <div className="text-sm text-gray-400">Đang tải...</div>
                )}
                {!loading && items.length === 0 && (
                  <div className="text-sm text-gray-400">Không có dữ liệu</div>
                )}

                {/* Category List */}
                <ul className="space-y-3">
                  {items.map((cate) => (
                    <li key={cate.id} className="group/item">
                      <Link
                        to={`/category/${cate.slug}`}
                        className="flex items-center gap-2 text-sm hover:text-[#E7D7BD] transition-all duration-200 hover:translate-x-1"
                      >
                        {cate.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          );
        })}
      </ul>
    </nav>

  );
}