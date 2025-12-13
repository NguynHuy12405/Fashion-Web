import { Navigate, Outlet, useLocation } from "react-router";
import { useAuthStore } from "../stores/useAuthStore";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";

export default function UserLayout() {
  const user = useAuthStore(state => state.user);
  const location = useLocation();
  if (!user) return <Navigate to="/login" state={{ from: location.pathname }} replace />;

  return (
    <div className="bg-[#ffffff]">
      <Header />
      <div className="min-h-screen flex flex-col pb-8 my-auto">
        <main className="grow pt-[60px]">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
}
