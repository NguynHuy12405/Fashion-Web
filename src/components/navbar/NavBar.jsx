import { Link, useNavigate } from "react-router";
import { useAuthStore } from "../../stores/useAuthStore";
import { useCartStore } from "../../stores/useCartStore";
import { GiShoppingBag } from "react-icons/gi";
import { useState } from "react";
import BtnAccount from "../Button/BtnAccount";


export default function NavBar() {
    const totalItems = useCartStore((state) => state.getTotalItems());
    const user = useAuthStore((s) => s.user);
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

  return (
    <div className="flex px-[120px] py-1.5 justify-between items-center max-[1024px]:px-6 shadow">
        {/* Logo */}
        <div className="w-[30%] flex items-center max-[768px]:order-2">
          <Link to="/">
            <h1 className="text-2xl font-bold">Logo Store</h1>
          </Link>
        </div>

        {/* Search */}
        <div className="w-[40%] flex justify-center max-[768px]:hidden">
          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border-2 p-1 border-[#0a0d1a] bg-transparent min-w-[300px]"
              placeholder="Tìm kiếm..."
            />
            <button
              onClick={() => navigate("/products")}
              className="absolute right-2 top-1.5 cursor-pointer"
            >
              <i className="fa-solid fa-magnifying-glass" />
            </button>
          </div>
        </div>

        <div className="w-[30%] flex justify-end items-center gap-4 max-[768px]:order-3">
          {/* Account */}
          <div className="relative">
            {user ? (
              <BtnAccount />
            ) : (
              <Link
                to="/login"
                className="bg-[#0a0d1a] text-[#ffffff] hover:bg-[#D2B48C] hover:text-[#0a0d1a] px-2 py-1 transition duration-200"
              >
                Login
              </Link>
            )}
          </div>

          {/* Cart */}
          <div className="relative">
            <Link to="/cart">
              <button className="pt-2 rounded-full hover:opacity-60 transition relative cursor-pointer">
                <GiShoppingBag size={20} color="#0a0d1a" />
                {totalItems > 0 && (
                  <span className="absolute -right-2 -top-0.5 bg-gray-300 text-[#0a0d1a] text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>
            </Link>
          </div>

        </div>
      </div>
  )
}
