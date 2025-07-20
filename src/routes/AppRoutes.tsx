import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { jwtDecode } from "jwt-decode";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from '../pages/Home';
import Login from '../pages/Login';
import { login, logout } from '../slices/authSlice';

const AppRoutes = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("bng_user");
    const token = localStorage.getItem("bng_token");

    if (user && token) {
      try {
        const decoded: any = jwtDecode(token);
        const isExpired = decoded.exp * 1000 < Date.now(); // exp is in seconds

        if (isExpired) {
          localStorage.clear();
          dispatch(logout());
          navigate('/');
        } else {
          dispatch(login(JSON.parse(user)));
        }
      } catch (err) {
        console.error("Invalid token", err);
        localStorage.clear();
        dispatch(logout());
        navigate('/');
      }
    }else{
      navigate('/');
    }
  }, [dispatch, navigate]);

  return (
      <Routes>
        <Route path="/chat" element={<Home />} />
        <Route path="/" element={<Login />} />
      </Routes>
  );
}

export default AppRoutes