import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from '../pages/Home';
import Login from '../pages/Login';
import { login } from '../slices/authSlice';

const AppRoutes = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    const user = localStorage.getItem("bng_user");
    const token = localStorage.getItem("bng_token");

    if (user && token) {
      dispatch(login(JSON.parse(user)));
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/chat" element={<Home />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes