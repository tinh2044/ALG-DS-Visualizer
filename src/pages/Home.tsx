import Navbar from "@/components/Navbar";
import { Outlet } from "react-router-dom";

function Home() {
  return (
    <div className="px-2">
      <Navbar />
      <Outlet />
    </div>
  );
}

export default Home;
