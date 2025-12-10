import { useNavigate } from "react-router";

export default function MenuDropdown({ search, setSearch }) {
    const navigate = useNavigate();

  return (
    <div className="md:hidden bg-[#0a0d1a] px-4 pb-4 space-y-4 border-t border-gray-700 animate-slide-down">
        {/* Mobile Search */}
        <div className="relative">
            <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-white text-black"
                placeholder="Tìm kiếm..."
            />
            <button
                onClick={() => navigate("/products")}
                className="absolute right-3 top-3 text-black"
            >
                <i className="fa-solid fa-magnifying-glass opacity-70" />
            </button>
        </div>

        {/* Mobile Nav */}
        <NavBar />
    </div>
  )
}
