import { Link } from "react-router";
import { useAuthStore } from "../../stores/useAuthStore";
import { useCartStore } from "../../stores/useCartStore";
import BtnSetting from "../Button/BtnSetting";

export default function HamburgerNav({ setMenuOpen, menuOpen }) {
    const totalItems = useCartStore((state) => state.getTotalItems());
    const user = useAuthStore((s) => s.user);

    return (
        <div className="flex md:hidden px-4 py-3 justify-between items-center">
            <button onClick={() => setMenuOpen(!menuOpen)}>
                <i className="fa-solid fa-bars text-2xl"></i>
            </button>

            <Link to="/">
                <h1 className="text-xl font-bold tracking-wide">Logo</h1>
            </Link>

            <div className="flex items-center gap-4">
                <Link to="/cart" className="relative">
                    <i className="fa-solid fa-basket-shopping text-xl"></i>
                    {totalItems > 0 && (
                        <span className="absolute -right-2 -top-1 bg-gray-300 text-black text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                        {totalItems}
                        </span>
                    )}
                </Link>

                {user ? (
                    <BtnSetting />
                ) : (
                    <Link to="/login">
                        <i className="fa-solid fa-user text-xl"></i>
                    </Link>
                )}
            </div>
        </div>
    )
}
