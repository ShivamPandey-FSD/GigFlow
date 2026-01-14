import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGigs } from "../../redux/slices/gigSlice";
import { selectAllGigs } from "../../redux/selectors/gigSelector";
import { useAuth } from "../../context/AuthContext";
import Loader from "../Loader";
import { Link } from 'react-router-dom'

function Gigs() {
 const { user } = useAuth();
 const dispatch = useDispatch();
 const [search, setSearch] = useState("");

 const gigs = useSelector(selectAllGigs);

 const biddableGigs = useMemo(() => {
  if (!user) return [];
  const userId = user.id || user._id;
  return gigs.filter(
   (gig) => gig.ownerId === userId
  );
 }, [gigs, user]);

 const { loading, error } = useSelector((state) => state.gigs);

 useEffect(() => {
  dispatch(fetchGigs());
 }, [dispatch]);

 const filteredGigs = biddableGigs.filter((gig) =>
  gig.title.toLowerCase().includes(search.toLowerCase())
 );


 return (
  <div className="px-10 h-screen flex flex-col py-5 w-full justify-start items-center pt-20 gap-10">
   <input
    type="search"
    placeholder="Enter keywords"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="w-full border border-black rounded-4xl px-10 py-5 focus:outline-none text-lg font-semibold"
   />

   <Link
   to={'/create-gig'}
    className="self-end bg-blue-400 text-white font-semibold text-xl uppercase text-center py-2 w-40 rounded-full cursor-pointer hover:bg-blue-300">add gig</Link>

   {loading && <Loader />}

   {!loading && filteredGigs.length === 0 && (
    <p className="text-gray-500 mt-10 text-2xl font-semibold">No gigs found</p>
   )}

   <div className="w-full flex flex-col gap-5 max-h-[50vh] overflow-y-auto"
   style={{
    scrollbarWidth: "none",
    msOverflowStyle: "none"
   }}>
   {filteredGigs && filteredGigs.map((gig) => (
    <Link key={gig._id} to={`/my-gigs/${gig._id}`} className="rounded-4xl py-5 px-10 border border-gray-300 flex justify-between items-center cursor-pointer hover:bg-gray-100">
     <div className="flex flex-col justify-center items-start gap-3">
      <h1 className="text-xl font-extrabold">{gig.title}</h1>
      <p className="text-md font-semibold">{gig.description}</p>
     </div>
     <span className="text-2xl font-semibold">₹ {gig.budget}</span>
    </Link>
   ))}
   </div>
  </div>
 )
}

export default Gigs;