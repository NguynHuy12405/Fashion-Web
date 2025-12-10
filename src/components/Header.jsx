import { Link, useNavigate } from "react-router";
import { useAuthStore } from "../stores/useAuthStore";
import { useCartStore } from "../stores/useCartStore";
import NavBar from "./NavBar";
import { useState } from "react";
import MenuDropdown from "./mobile/MenuDropdown";
import HamburgerNav from "./mobile/HamburgerNav";
import BtnSetting from "./Button/BtnSetting";

export default function Header() {
  const totalItems = useCartStore((state) => state.getTotalItems());
  const user = useAuthStore((s) => s.user);
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="bg-[#ffffff] fixed w-full text-[#0a0d1a] shadow-lg z-50">
      <div className="hidden md:flex mx-[120px] py-3 justify-between items-center max-[1024px]:mx-6">
        {/* Logo */}
        <div className="w-[20%] flex items-center">
          <Link to="/">
            <h1 className="text-2xl font-bold">Logo Store</h1>
          </Link>
        </div>

        {/* Nav */}
        <div className="w-[50%] flex justify-center">
          <NavBar />
        </div>

        <div className="w-[30%] flex justify-end items-center gap-4">
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border-2 p-1.5 border-[#0a0d1a] bg-transparent"
              placeholder="Tìm kiếm..."
            />
            <button
              onClick={() => navigate("/products")}
              className="absolute right-2 top-2 cursor-pointer"
            >
              <i className="fa-solid fa-magnifying-glass" />
            </button>
          </div>

          {/* Cart */}
          <div className="relative">
            <Link to="/cart">
              <button className="pt-2 rounded-full hover:opacity-60 transition relative cursor-pointer">
                <i className="fa-solid fa-basket-shopping text-xl" /> 
                {totalItems > 0 && (
                  <span className="absolute -right-2 -top-0.5 bg-gray-300 text-[#0a0d1a] text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>
            </Link>
          </div>

          {/* Setting / Login */}
          {user ? (
            <BtnSetting />
          ) : (
            <Link
              to="/login"
              className="bg-[#0a0d1a] text-[#ffffff] hover:bg-[#D2B48C] hover:text-[#0a0d1a] px-2 py-1 transition duration-200"
            >
              Login
            </Link>
          )}
        </div>
      </div>

      {/* ===== MOBILE ===== */}
      <HamburgerNav
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />
      {menuOpen && (
        <MenuDropdown search={search} setSearch={setSearch} />
      )}
    </header>
  );
}
