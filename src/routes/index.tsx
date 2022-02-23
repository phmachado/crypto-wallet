import { useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";

import Buy from "../pages/Buy";
import Dashboard from "../pages/Dashboard";
import Exchange from "../pages/Exchange";
import History from "../pages/History";
import Login from "../pages/Login";
import PageNotFound from "../pages/PageNotFound";
import Profile from "../pages/Profile";
import Sell from "../pages/Sell";
import SignUp from "../pages/SignUp";

function AppRoutes(): JSX.Element {
  const navigate = useNavigate();
  const location = useLocation();

  // Controle de acesso as rotas no App
  useEffect(() => {
    if (location.pathname !== "/cadastro") {
      const dummyToken = localStorage.getItem("dummyToken");
      if (!dummyToken || dummyToken === "remove-access") {
        navigate("/");
      }
    }
  }, [location.pathname]);

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/cadastro" element={<SignUp />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/vender" element={<Sell />} />
      <Route path="/comprar" element={<Buy />} />
      <Route path="/trocar" element={<Exchange />} />
      <Route path="/extrato" element={<History />} />
      <Route path="/perfil" element={<Profile />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default AppRoutes;
