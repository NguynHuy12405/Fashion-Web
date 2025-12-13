import NavBarList from "../navbar/NavBarList";
import NavBar from "../navbar/NavBar";

export default function Header() {

  return (
    <header className="bg-[#ffffff] fixed w-full text-[#0a0d1a] shadow-lg z-50">
      {/* NavBar */}  
      <NavBar />

      {/* Nav List Category */}
      <NavBarList />

    </header>
  );
}
