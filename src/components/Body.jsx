import React, { useEffect } from "react";
import Navbar from "./Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import api from "../utils/api";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userDataFromStore = useSelector((store) => store.user);
  const fetchUser = async () => {
    // Guard: Don't make request if no token
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    
    try {
      const res = await api.get("/profile");
      dispatch(addUser(res.data));
    } catch (error) {
      // 401 is handled by api interceptor, just log other errors
      if (error?.response?.status !== 401) {
        console.error(error);
      }
    }
  };
  useEffect(() => {
    if (!userDataFromStore) {
      fetchUser();
    }
  }, []);
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Body;
