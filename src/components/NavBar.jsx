import { useState } from "react";
import { Link } from "react-router";
import { useCategoryStore } from "../stores/useCategoryStore";

export default function NavBar() {
    const categories = useCategoryStore((state) => state.categories);
    const [open, setOpen] = useState(false);
    
  return (
    <nav className="relative z-100">
        <ul className='flex space-x-6'>
            <li className="group relative">
                <Link to="/" className="hover:text-orange-200 transition">
                    Trang chủ
                </Link>
                <div className="absolute left-0 -bottom-1 h-0.5 w-0 bg-orange-400 transition-all duration-300 group-hover:w-full" />
            </li>
            <li className="relative">
                <button onClick={() => setOpen(!open)} className="hover:text-orange-200 transition flex items-center gap-1 cursor-pointer group relative">
                    Danh Mục
                    <i className="fa-solid fa-chevron-down text-[14px]" />
                    <div className="absolute left-0 -bottom-1 h-0.5 w-0 bg-orange-400 transition-all duration-300 group-hover:w-full" />
                </button>
                
                <ul
                    className={`absolute w-[150px] left-0 mt-2 bg-white shadow-md rounded p-2 z-50 transition-all duration-300 ${
                        open ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2 "
                    }`}
                >
                    {categories.map((cate) => (
                        <li key={cate.id} className="group relative p-1">
                            <Link to={`/category/${cate.id}`} className="hover:text-orange-200 transition">
                                {cate.categoryName}
                                <div className="absolute left-0 -bottom-1 h-0.5 w-0 bg-orange-400 transition-all duration-300 group-hover:w-full" />
                            </Link>
                        </li>
                    ))}
                </ul>
            </li>
            <li className="group relative">
                <Link to="/" className="hover:text-orange-200 transition">
                    Về chúng tôi
                </Link>
                <div className="absolute left-0 -bottom-1 h-0.5 w-0 bg-orange-400 transition-all duration-300 group-hover:w-full" />
            </li>
            <li className="group relative">
                <Link to="/" className="hover:text-orange-200 transition">
                    Liên Hệ
                </Link>
                <div className="absolute left-0 -bottom-1 h-0.5 w-0 bg-orange-400 transition-all duration-300 group-hover:w-full" />
            </li>
        </ul>
    </nav>
  )
}
