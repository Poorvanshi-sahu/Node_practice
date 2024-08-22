import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import { useMyContext } from "./contextAPI";

const Start = () => {
  const { setIsLogIn, isLogIn } = useMyContext();
  // console.log("start",isLogIn);
  useEffect(()=>{
      
  },[isLogIn])
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={isLogIn ? <Home />:<Login />} />
        <Route path="/Login" element={isLogIn ? <Home />:<Login />} />
        <Route path="/register" element={isLogIn ? <Home/>: <Register/>} />
        <Route path="/home" element={isLogIn ? <Home />:<Login/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default Start;
