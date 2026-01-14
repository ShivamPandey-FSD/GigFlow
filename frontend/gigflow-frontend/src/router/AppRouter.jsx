import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "../pages/AuthPage";
import HomePage from "../pages/HomePage";
import ProtectedRoute from "../routes/ProtectedRoute";
import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";
import AllGigs from "../components/Home/AllGigs";
import PlaceBid from "../components/Home/PlaceBid";
import Gigs from "../components/Home/Gigs";
import CreateGig from "../components/Home/CreateGig";
import GetBids from "../components/Home/GetBids";
import Bids from "../components/Home/Bids";

const AppRouter = () => {
 return (
  <BrowserRouter>
   <Routes>
    <Route path="auth" element={<AuthPage />}>
     <Route path="login" element={<Login />} />
     <Route path="register" index element={<Register />} />
    </Route>

    <Route element={<ProtectedRoute />}>
     <Route path="/" element={<HomePage />}>
      <Route index element={<Navigate to="gigs" replace />} />
      <Route path="gigs" element={<AllGigs />} />
      <Route path="gigs/:gigId" element={<PlaceBid />} />
      <Route path="my-gigs" element={<Gigs />} />
      <Route path="my-gigs/:gigId" element={<GetBids />} />
      <Route path="create-gig" element={<CreateGig />} />
      <Route path="bids" element={<Bids />} />
     </Route>
    </Route>
   </Routes>
  </BrowserRouter>
 );
};

export default AppRouter;
