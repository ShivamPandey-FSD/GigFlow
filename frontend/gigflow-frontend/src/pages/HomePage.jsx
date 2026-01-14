import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Home/Sidebar";

function HomePage() {
 const [active, setActive] = useState('');
 return (
  <div className="flex justify-start items-start">
   <Sidebar active={active} setActive={setActive} />
   <Outlet active={active} />
  </div>
 )
}

export default HomePage;