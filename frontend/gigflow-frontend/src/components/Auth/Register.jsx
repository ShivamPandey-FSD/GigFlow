import { useState } from "react";
import api from "../../api/axios";
import { useAuth } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from "react-hot-toast";

function Register() {
 const [name, setName] = useState('');
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
 const { login } = useAuth();
 const navigate = useNavigate();

 const handleRegister = async (e) => {
  e.preventDefault();

  const data = {
   name,
   email,
   password
  }

  try {
   const res = await api.post("/auth/register", data, {
    withCredentials: true
   });

   login(res.data.user);
   navigate("/");
  } catch (error) {
   console.error(error.response);
   toast.error("Registration Failed: " + error.response.data.message);
  }
 };

 return (
  <div className="flex justify-center items-center my-30">
   <form onSubmit={handleRegister} className="flex flex-col justify-start items-center gap-10 border-2 rounded-2xl p-10 w-[40%]">
    <h1 className="text-3xl font-bold">REGISTER</h1>
    <div className="flex flex-col justify-start items-center gap-5 w-full text-lg font-semibold">
     <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter Full Name" className="w-full px-5 py-2 focus:outline-none rounded-2xl border border-gray-400" />
     <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email" className="w-full px-5 py-2 focus:outline-none rounded-2xl border border-gray-400" />
     <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Password" className="w-full px-5 py-2 focus:outline-none rounded-2xl border border-gray-400" />
     <button type="submit" className="border border-gray-400 text-lg font-semibold px-5 py-2 cursor-pointer rounded-2xl hover:bg-gray-200">Submit</button>
    </div>
    <Link to={'/auth/login'} className="text-blue-300 text-lg font-semibold border-b-4 border-transparent hover:border-b-blue-300">
     Already have an Account? Login here
    </Link>
   </form>
  </div>
 )
}

export default Register;