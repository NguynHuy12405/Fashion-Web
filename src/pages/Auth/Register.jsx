import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuthStore } from "../../stores/useAuthStore";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const register = useAuthStore((state) => state.register);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const res = register(name, email, password);

    if (!res.success) {
      alert(res.message);
      return;
    }

    alert("Đăng ký thành công!");
    navigate("/user"); // mặc định user
  };

  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-gray-100 text-black">
      <div className="w-[450px] p-8 border rounded-2xl shadow-2xl bg-white">
        <h2 className="text-3xl font-bold text-center mb-8">Register</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col">
            <label Name className="mb-1">FullName</label>
            <input
              type="text"
              placeholder="FullName..."
              className="border border-gray-300 p-3 rounded-xl"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label Email className="mb-1">Email</label>
            <input
              type="email"
              placeholder="Email..."
              className="border border-gray-300 p-3 rounded-xl"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label Password className="mb-1">Password</label>
            <input
              type="password"
              placeholder="Password..."
              className="border border-gray-300 p-3 rounded-xl"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label Password className="mb-1">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm Password..."
              className="border border-gray-300 p-3 rounded-xl"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <div className="flex justify-between text-[16px]">
            <div className="flex justify-center items-center">
              <input type="checkbox" className="w-4 h-4 rounded border-gray-400 accent-orange-600 cursor-pointer hover:shadow-md transition-all" />
              <label Password className="ml-2">Remember Password</label>
            </div>
            <div>
              <Link to="" className="text-blue-400 underline hover:text-blue-800">Forgot Password</Link>
            </div>
          </div>

          <button
            type="submit"
            className="bg-orange-400 hover:bg-orange-500 text-white rounded-xl py-3 font-semibold cursor-pointer"
          >
            Register
          </button>
          <p className="mt-4 text-center text-sm">
            Đã có tài khoản?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Đăng nhập ngay
            </Link>
          </p>

          <div>
            <p className="text-center text-xs gap-4">More</p>
            <div className="flex justify-center items-center gap-4 mt-2">
              <div className="flex justify-center items-center w-9 h-9 border rounded-full hover:bg-[#ccc]">
                <Link to="" >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-github-icon lucide-github"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                </Link>
              </div>
              <div className="flex justify-center items-center w-9 h-9 border rounded-full hover:bg-[#ccc]">
                <Link to="" >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-facebook-icon lucide-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                </Link>
              </div>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
}
