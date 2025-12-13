import { Outlet } from "react-router";
import ChatWidget from "../components/ChatWidget";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";


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
