import { useState } from "react";
import { useAuthStore } from "../stores/useAuthStore";
import { Link } from "react-router";

export default function BtnSetting() {
    const user = useAuthStore((s) => s.user);
    const [open, setOpen] = useState(false);
    const logout = useAuthStore((state) => state.logout);

  return (
    <>
        <button
            onClick={() => setOpen(!open)} className="hover:opacity-60 hover:backdrop-brightness-50 transition p-2 rounded-full cursor-pointer z-50"
            title="Cài đặt"
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`lucide lucide-settings-icon lucide-settings w-6 h-6 hover:text-[#ccc] transition-transform duration-500 ${ open ? "rotate-180" : "rotate-0"}`}>
                <path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"/>
                <circle cx="12" cy="12" r="3"/>
            </svg>
        </button>
        <ul
        className={`absolute w-[200px] text-center right-0 mt-2 bg-white shadow-md rounded p-2 transition-all duration-300 ${
            open ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"
        }`}
        >
            {user.role === "admin" ? (
                <li className="relative px-3 py-1 group">
                    <Link to="/admin" className="hover:text-orange-200 transition relative z-10">
                        Admin Manage
                        <div className="absolute left-0 -bottom-1 h-0.5 w-0 bg-orange-400 transition-all duration-300 group-hover:w-full" />
                    </Link>
                </li>
            ) : null}
            
            <li className="relative px-3 py-1 group">
                <Link to="/transactionHistory" className="hover:text-orange-200 transition relative z-10">
                    Lịch Sử Giao Dịch
                    <div className="absolute left-0 -bottom-1 h-0.5 w-0 bg-orange-400 transition-all duration-300 group-hover:w-full" />
                </Link>
            </li>
            <li className="relative px-3 py-1 group">
                <Link to="/orders" className="hover:text-orange-200 transition relative z-10">
                    Đơn Hàng
                    <div className="absolute left-0 -bottom-1 h-0.5 w-0 bg-orange-400 transition-all duration-300 group-hover:w-full" />
                </Link>
            </li>
            <li className="relative px-3 py-1 group">
                <Link to="/profile" className="hover:text-orange-200 transition relative z-10">
                    Profile
                    <div className="absolute left-0 -bottom-1 h-0.5 w-0 bg-orange-400 transition-all duration-300 group-hover:w-full" />
                </Link>
            </li>
            <li className="relative px-3 py-1 group">
                <button onClick={logout} className="hover:text-orange-200 transition relative z-10 cursor-pointer">
                    Logout
                    <div className="absolute left-0 -bottom-1 h-0.5 w-0 bg-orange-400 transition-all duration-300 group-hover:w-full" />
                </button>
            </li>
        </ul>
    </>
  )
}
