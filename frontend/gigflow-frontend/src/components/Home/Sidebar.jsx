import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Sidebar() {
 const navigate = useNavigate();
 const { logout } = useAuth();

 const menuItems = [
  { name: "gigs", label: "Place a Bid" },
  { name: "my-gigs", label: "Your Gigs" },
  { name: "bids", label: "Your Bids" },
  { name: "logout", label: "Log Out", isLogout: true }
 ];

 const handleLogout = async () => {
  try {
   await logout();
   navigate("/auth/login");
  } catch (err) {
   console.error("Logout failed", err);
  }
 };

 return (
  <div className="w-80 flex flex-col gap-20 p-2 border-r border-gray-300 h-screen">
   <h1 className="text-4xl font-extrabold">GigFlow</h1>

   <div className="flex flex-col gap-5">
    {menuItems.map((item) =>
     item.isLogout ? (
      <button
       key={item.name}
       onClick={handleLogout}
       className="text-lg font-semibold px-4 py-2 text-right cursor-pointer"
      >
       {item.label}
      </button>
     ) : (
      <NavLink
       key={item.name}
       to={item.name}
       className={({ isActive }) =>
        `text-lg font-semibold px-4 py-2 rounded-full text-right
         ${isActive ? "bg-gray-300" : ""}`
       }
      >
       {item.label}
      </NavLink>
     )
    )}
   </div>
  </div>
 );
}

export default Sidebar;
