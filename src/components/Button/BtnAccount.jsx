import { useState } from "react";
import { useAuthStore } from "../../stores/useAuthStore";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";

export default function BtnAccount() {
    const user = useAuthStore((s) => s.user);
    const [open, setOpen] = useState(false);
    const logout = useAuthStore((state) => state.logout);

  return (
    <>
        <button
            onClick={() => setOpen(!open)} className="transition p-2 rounded-full cursor-pointer hover:opacity-60"
            title="Account"
        >
            <FaUser size={20} color="#0a0d1a" />
        </button>
        <ul
        className={`absolute w-[180px] text-center left-0 top-[35px] mt-2 text-[#0a0d1a] bg-[#ffffff] shadow-md rounded p-2 transition-all duration-300 ${
            open ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"
        }`}
        >
            {user.role === "Admin" ? (
                <li className="relative px-3 py-1 group">
                    <Link to="/admin" className="transition relative z-50">
                        Admin Manage
                        <div className="absolute left-0 -bottom-1 h-0.5 w-0 bg-[#0a0d1a] transition-all duration-300 group-hover:w-full" />
                    </Link>
                </li>
            ) : null}
            
            <li className="relative px-3 py-1 group">
                <Link to="/orders" className="transition relative z-50">
                    Đơn Hàng
                    <div className="absolute left-0 -bottom-1 h-0.5 w-0 bg-[#0a0d1a] transition-all duration-300 group-hover:w-full" />
                </Link>
            </li>
            <li className="relative px-3 py-1 group">
                <Link to="/profile" className="transition relative z-50">
                    Profile
                    <div className="absolute left-0 -bottom-1 h-0.5 w-0 bg-[#0a0d1a] transition-all duration-300 group-hover:w-full" />
                </Link>
            </li>
            <li className="relative px-3 py-1 group">
                <button onClick={logout} className="transition relative z-50 cursor-pointer">
                    Logout
                    <div className="absolute left-0 -bottom-1 h-0.5 w-0 bg-[#0a0d1a] transition-all duration-300 group-hover:w-full" />
                </button>
            </li>
        </ul>
    </>
  )
}
