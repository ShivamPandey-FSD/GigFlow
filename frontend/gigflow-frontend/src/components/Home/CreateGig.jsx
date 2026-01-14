import { useDispatch, useSelector } from "react-redux";
import { createGig } from "../../redux/slices/gigSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateGig() {
 const dispatch = useDispatch();
 const { loading } = useSelector((state) => state.gigs);
 const [title, setTitle] = useState('');
 const [budget, setBudget] = useState('');
 const [description, setDescription] = useState('');
 const navigate = useNavigate();

 const handleSubmit = (e) => {
  e.preventDefault();

  const gigData = {
   title,
   description,
   budget
  };

  dispatch(createGig(gigData));
  navigate('/gigs');
 };

 return (
  <div className="px-10 h-screen flex flex-col justify-start items-center py-5 w-full pt-20 gap-10">
   <h1 className="text-4xl font-extrabold underline underline-offset-4">Create Gig</h1>
   <form onSubmit={handleSubmit} className="w-[75%] flex flex-col gap-10 text-lg font-semibold">
    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter title" className="border border-black py-5 px-10 rounded-4xl focus:outline-none" />
    <textarea rows='5' value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter description" className="border border-black py-5 px-10 rounded-4xl focus:outline-none"></textarea>
    <div className="relative w-full">
     <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600">
      ₹
     </span>

     <input
      type="text"
      value={budget} onChange={(e) => setBudget(e.target.value)}
      placeholder="Enter budget"
      className="border border-black py-5 pl-12 pr-10 rounded-4xl focus:outline-none w-full"
     />
    </div>
    <button type="submit" className="bg-blue-400 hover:bg-blue-300 w-30 py-5 rounded-2xl self-center cursor-pointer text-white">Submit</button>
   </form>
  </div>
 )
}

export default CreateGig;