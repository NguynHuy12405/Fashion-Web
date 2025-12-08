import { Outlet } from "react-router";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ChatWidget from "../components/ChatWidget";

export default function PublicLayout() {
  return (
    <>
      <Header />

      <div className="min-h-screen bg-white flex flex-col pb-8 my-auto">
        <main className="grow pt-[70px]">
          <Outlet />
        </main>
        {/* <ChatWidget /> */}
      </div>
      
      <Footer />
    </>
  );
}
