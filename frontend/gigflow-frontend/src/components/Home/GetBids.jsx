import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBids, hireBid } from "../../redux/slices/bidSlice";
import { selectAllBids } from "../../redux/selectors/bidSelector";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from 'react-router-dom'
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

function GetBids() {
 const { gigId } = useParams();
 const { user } = useAuth();
 const dispatch = useDispatch();
 const { loading, error } = useSelector((state) => state.bids);
 const navigate = useNavigate();

 const bids = useSelector(selectAllBids);

 useEffect(() => {
  dispatch(fetchBids(gigId));
 }, [dispatch]);

 const hireFreelancer = async (e) => {
  e.preventDefault();

  const bidId = e.target.id;

  try {
   await dispatch(hireBid(bidId)).unwrap();
   navigate('/my-gigs');
  } catch (err) {
   toast.error("Failed to hire freelancer");
  }
 };

 return (
  <div className="w-full px-10 pt-20">
   <table className="w-full table-fixed border border-gray-200 shadow-xl text-lg">
    <thead className="font-semibold border-b border-b-gray-200">
     <tr>
      <th className="py-4">Name</th>
      <th className="py-4">Email</th>
      <th className="py-4">Message</th>
      <th className="py-4">Bid Price</th>
      <th className="py-4">Status</th>
      <th className="py-4">Action</th>
     </tr>
    </thead>
    <tbody className="font-medium text-center">
     {bids.length > 0 ? (
      bids.map((bid) => (
       <tr key={bid._id}>
        <td className="py-4">{bid.freelancerId.name}</td>
        <td className="py-4">{bid.freelancerId.email}</td>
        <td className="py-4">{bid.message}</td>
        <td className="py-4">{bid.price}</td>
        <td className="py-4">{bid.status}</td>
        <td className="py-4">
         {bid.status !== 'hired' && (
          <button id={bid._id} onClick={hireFreelancer} className="bg-green-400 w-20 py-2 rounded-2xl text-white cursor-pointer">HIRE</button>
         )}
        </td>
       </tr>
      ))
     ) : (
      <tr>
       <td colSpan={'4'} className="py-20 text-2xl font-semibold text-gray-300 text-center">No Bids Found</td>
      </tr>
     )}
    </tbody>
   </table>
  </div>
 )
}

export default GetBids;