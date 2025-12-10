import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useCategoryStore } from "../stores/useCategoryStore";

export default function NavBar() {
  const { categories, loadCategories, loading } = useCategoryStore();

  useEffect(() => {
    loadCategories();
  }, []);

  return (
    <nav className="relative z-50 text-[#0a0d1a]">
      <ul className="hidden md:flex space-x-4">

        {Object.keys(categories).map((group) => {
          const items = categories[group];
          if (!Array.isArray(items) || items.length === 0) return null;

          return (
            <li key={group} className="relative group">
              {/* Menu Title */}
              <span className="flex items-center gap-1 cursor-pointer hover:text-[#E7D7BD] transition font-medium">
                {group}
                <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-[#D2B48C] transition-all duration-300 group-hover:w-full" />
              </span>
              
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
                        <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-[#0a0d1a] transition group-hover/item:w-full" />
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

      {/* ===== MOBILE NAV ===== */}
      <div className="md:hidden px-4 py-3 space-y-2">

        {Object.keys(categories).map((group) => {
          const items = categories[group];
          if (!Array.isArray(items) || items.length === 0) return null;

          return (
            <details key={group} className=" rounded-lg">
              <summary className="cursor-pointer font-medium py-3 px-4 flex justify-between items-center">
                {group}
                <i className="fa-solid fa-chevron-down text-[12px]" />
              </summary>

              <ul className="px-6 pb-3 space-y-2 mt-1">
                {items.map((cate) => (
                  <li key={cate.id}>
                    <Link
                      to={`/category/${cate.slug}`}
                      className="block py-1 text-sm text-[#0a0d1a] hover:text-[#D2B48C]"
                    >
                      {cate.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </details>
          );
        })}

      </div>
    </nav>

  );
}