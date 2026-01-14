import { useState } from "react";
import api from "../../api/axios";
import { useAuth } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from "react-hot-toast";

function Login() {
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
 const { login } = useAuth();
 const navigate = useNavigate();

 const handleLogin = async (e) => {
  e.preventDefault();

  const data = {
   email,
   password
  }

  try {
   const res = await api.post("/auth/login", data, {
    withCredentials: true
   });

   login(res.data.user);
   navigate("/");
  } catch (error) {
   console.error(error.response);
   toast.error("Login Failed: " + error.response.data.message);
  }
 };

 return (
  <div className="flex justify-center items-center my-30">
   <form onSubmit={handleLogin} className="flex flex-col justify-start items-center gap-10 border-2 rounded-2xl p-10 w-[40%]">
    <h1 className="text-3xl font-bold">LOGIN</h1>
    <div className="flex flex-col justify-start items-center gap-5 w-full text-lg font-semibold">
     <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email" className="w-full px-5 py-2 focus:outline-none rounded-2xl border border-gray-400" />
     <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Password" className="w-full px-5 py-2 focus:outline-none rounded-2xl border border-gray-400" />
     <button type="submit" className="border border-gray-400 text-lg font-semibold px-5 py-2 cursor-pointer rounded-2xl hover:bg-gray-200">Submit</button>
    </div>
    <Link to={'/auth/register'} className="text-blue-300 text-lg font-semibold border-b-4 border-transparent hover:border-b-blue-300">
     Don't have an Account? Register here
    </Link>
   </form>
  </div>
 )
}

export default Login;