import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios"; // your axios instance

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
 const [user, setUser] = useState(null);
 const [loading, setLoading] = useState(true);

 const checkAuth = async () => {
  try {
   const res = await api.get("/auth/me");
   setUser(res.data.user);
  } catch (err) {
   setUser(null);
  } finally {
   setLoading(false);
  }
 };

 useEffect(() => {
  checkAuth();
 }, []);

 const login = (userData) => {
  setUser(userData);
 };

 const logout = async () => {
  await api.post("/auth/logout");
  setUser(null);
 };

 return (
  <AuthContext.Provider
   value={{ user, loading, login, logout }}
  >
   {children}
  </AuthContext.Provider>
 );
};

export const useAuth = () => useContext(AuthContext);
