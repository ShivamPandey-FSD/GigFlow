import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllBids } from "../../redux/slices/bidSlice";
import { selectAllBids } from "../../redux/selectors/bidSelector";
import { useAuth } from "../../context/AuthContext";
import { useParams } from "react-router-dom";

function Bids() {
 const { gigId } = useParams();
 const { user } = useAuth();
 const dispatch = useDispatch();
 const { loading, error } = useSelector((state) => state.bids);
 const ITEMS_PER_PAGE = 20;
 const [currentPage, setCurrentPage] = useState(1);

 const bids = useSelector(selectAllBids);
 const paginatedBids = useMemo(() => {
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  return bids.slice(startIndex, endIndex);
 }, [bids, currentPage]);
 const totalPages = Math.ceil(bids.length / ITEMS_PER_PAGE);

 useEffect(() => {
  dispatch(fetchAllBids());
 }, [dispatch]);

 return (
  <div className="w-full px-10 pt-20">
   <table className="w-full table-fixed border border-gray-200 shadow-xl text-lg">
    <thead className="font-semibold border-b border-b-gray-200">
     <tr>
      <th className="py-4">Title</th>
      <th className="py-4">Description</th>
      <th className="py-4">Message</th>
      <th className="py-4">Bid</th>
      <th className="py-4">Status</th>
     </tr>
    </thead>
    <tbody className="font-medium text-center">
     {paginatedBids.length > 0 ? (
      paginatedBids.map((bid) => (
       <tr>
        <td className="py-4">{bid.gigId.title}</td>
        <td className="py-4">{bid.gigId.description}</td>
        <td className="py-4">{bid.message}</td>
        <td className="py-4">{bid.price}</td>
        <td className="py-4">{bid.status}</td>
       </tr>
      ))
     ) : (
      <tr>
       <td colSpan={'4'} className="py-20 text-2xl font-semibold text-gray-300 text-center">No Bids Found</td>
      </tr>
     )}
    </tbody>
   </table>
   <div className="flex justify-center items-center gap-4 mt-10">
 <button
  disabled={currentPage === 1}
  onClick={() => setCurrentPage((p) => p - 1)}
  className="px-4 py-2 border rounded disabled:opacity-50"
 >
  Prev
 </button>

 <span className="font-semibold">
  Page {currentPage} of {totalPages}
 </span>

 <button
  disabled={currentPage === totalPages}
  onClick={() => setCurrentPage((p) => p + 1)}
  className="px-4 py-2 border rounded disabled:opacity-50"
 >
  Next
 </button>
</div>
  </div>
 )
}

export default Bids;