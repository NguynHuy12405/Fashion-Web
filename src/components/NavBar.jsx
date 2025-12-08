import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useCategoryStore } from "../stores/useCategoryStore";

export default function NavBar() {
  const { categories, loadCategories, loading } = useCategoryStore();

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  return (
    <nav className="relative z-50 bg-white">
      <ul className="flex space-x-6 px-4 py-3">
        <li className="group relative">
          <Link to="/" className="hover:text-orange-400 transition">
            Trang chủ
          </Link>
          <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-orange-400 transition-all duration-300 group-hover:w-full" />
        </li>

        <li className="relative group">
          <span className="hover:text-orange-400 transition flex items-center gap-1 cursor-pointer">
            Danh Mục
            <i className="fa-solid fa-chevron-down text-[12px]" />
          </span>
          <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-orange-400 transition-all duration-300 group-hover:w-full" />

          <div className="absolute left-[-350px] mt-2 bg-white shadow-lg rounded-lg p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-2 group-hover:translate-y-0 transition-all duration-300 z-50 min-w-[800px]">
            {loading && (
              <div className="p-4 text-sm text-gray-500">Đang tải...</div>
            )}

            {!loading && Object.keys(categories).length === 0 && (
              <div className="p-4 text-sm text-gray-500">Không có danh mục</div>
            )}

            <div className="grid grid-cols-4 gap-6">
              {Object.keys(categories).map((group) => {
                const items = categories[group];
                if (!Array.isArray(items) || items.length === 0) return null;

                return (
                  <div key={group} className="min-w-[180px]">
                    <h4 className="text-orange-500 text-[16px] font-bold mb-3 pb-2 border-b border-gray-200">
                      {group}
                    </h4>
                    <ul className="space-y-2">
                      {items.map((cate) => (
                        <li key={cate.id} className="group/item ">
                          <Link
                            to={`/category/${cate.slug}`}
                            className="text-sm text-gray-700 hover:text-orange-400 hover:translate-x-1 transition-all duration-200 flex items-center gap-2"
                          >
                            <span className="w-1 h-1 bg-gray-400 rounded-full group-hover/item:bg-orange-400 transition-colors" />
                            {cate.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </li>

        <li className="group relative">
          <Link to="/about-us" className="hover:text-orange-400 transition">
            Về chúng tôi
          </Link>
          <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-orange-400 transition-all duration-300 group-hover:w-full" />
        </li>

        <li className="group relative">
          <Link to="/contact-us" className="hover:text-orange-400 transition">
            Liên Hệ
          </Link>
          <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-orange-400 transition-all duration-300 group-hover:w-full" />
        </li>
      </ul>
    </nav>
  );
}