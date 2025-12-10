import { Outlet } from "react-router";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ChatWidget from "../components/ChatWidget";

export default function PublicLayout() {
  return (
    <div className="bg-[#ffffff]">
      <Header />

      <div className="min-h-screen flex flex-col pb-8 my-auto">
        <main className="grow pt-[60px]">
          <Outlet />
        </main>
        {/* <ChatWidget /> */}
      </div>
      
      <Footer />
    </div>
  );
}
