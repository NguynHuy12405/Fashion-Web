import { Handbag, LayoutDashboard, Menu, ReceiptText, Settings, Users } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router";

export default function SideBar() {
    const [open, setOpen] = useState(true);
    const location = useLocation();

    const menuItems = [
        { label: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/admin" },
        { label: "Products", icon: <Handbag size={20} />, path: "/admin/products" },
        { label: "Orders", icon: <ReceiptText size={20} />, path: "/admin/orders" },
        { label: "Users", icon: <Users size={20} />, path: "/admin/users" },
        { label: "Settings", icon: <Settings size={20} />, path: "/admin/settings" }
    ];

    return (
        <div className={`${open ? "w-64" : "w-20"} bg-white p-4 shadow-md transition-all`}>
            <button onClick={() => setOpen(!open)} className="mb-6">
                <Menu />
            </button>

            <nav className="flex-1">
                <ul className="space-y-3">
                    {menuItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <li key={item.path}>
                                <Link
                                    to={item.path}
                                    className={`flex items-center gap-3 p-2 rounded-xl transition 
                                        ${isActive ? "bg-orange-500 text-white" : "hover:bg-gray-200"}`}
                                >
                                    {item.icon}
                                    {open && <span>{item.label}</span>}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </div>
    );
}
