import { Link, useNavigate } from 'react-router';
import { useAuthStore } from '../stores/useAuthStore';
import { useCartStore } from '../stores/useCartStore';
import NavBar from './NavBar';
import BtnSetting from './BtnSetting';
import { useState } from 'react';

export default function Header() {
  const totalItems = useCartStore((state) => state.getTotalItems());
  const user = useAuthStore((s) => s.user);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  
  return (
    <header className="bg-white fixed w-full  shadow-lg rounded-b-xl z-50">
      <div className="mx-[120px] px-4 py-4 flex justify-between items-center leading-[1.6] text-black">
        {/* logo */}
        <div className='w-[30%] flex justify-start items-center'>
          <Link to="/">
            <h1 className="text-2xl font-bold text-orange-500">Logo Store</h1>
          </Link>
        </div>
        {/* Nav */}
        <div className="flex justify-center items-center space-x-8 w-[40%]">
          <NavBar />
        </div>
        {/* interact */}
        <div className="flex justify-end items-center w-[30%]">
          {/* search */}
          <div className='relative'>
            <div className='relative'>
              <input className='border-2 px-2 py-1 rounded-2xl focus:outline-2 border-gray-200' type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder='Tìm Kiếm...' />
              <button onClick={() => navigate("/products")} className='absolute left-42 bottom-1.5 cursor-pointer'>
                <i className="fa-solid fa-magnifying-glass opacity-70" />
              </button>
            </div>
          </div>
          {/* cart */}
          <div className="relative">
            <Link to="/cart">
                <button className="px-4 py-2 rounded-full transition flex items-center cursor-pointer hover:opacity-50">
                    <span className='text-[20px]'>
                      <i className="fa-solid fa-basket-shopping text-black" />
                    </span>
                    {totalItems > 0 && (
                        <span className="absolute right-0 top-1 left-[35px] text-black bg-gray-300 text-xs rounded-full w-3.5 h-3.5 flex items-center justify-center">
                          {totalItems}
                        </span>
                    )}
                </button>
            </Link>
          </div>
          {/* setting & login */}
          <div className="relative">
              {user ? (
                <BtnSetting />
              ) : (
                <Link
                  to="/login"
                  className="bg-orange-400 hover:bg-orange-600 px-4 py-2 rounded-lg transition"
                >
                  Login
                </Link>
              )}
          </div>
        </div>
      </div>
    </header>
  );
}
