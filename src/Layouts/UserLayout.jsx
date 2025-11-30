import { Navigate, Outlet, useLocation } from "react-router";
import { useAuthStore } from "../stores/useAuthStore";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function UserLayout() {
  const user = useAuthStore(state => state.user);
  const location = useLocation();
  if (!user) return <Navigate to="/login" state={{ from: location.pathname }} replace />;

  return (
    <>
      <Header />
      <div className="min-h-screen bg-white flex flex-col pb-8 my-auto">\
        <main className="grow pt-[70px]">
          <Outlet />
        </main>
      </div>
      <Footer />
    </>
  );
}
