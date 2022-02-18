import { Routes, Route } from "react-router-dom";

import Buy from "../pages/Buy";
import Dashboard from "../pages/Dashboard";
import Exchange from "../pages/Exchange";
import History from "../pages/History";
import Login from "../pages/Login";
import PageNotFound from "../pages/PageNotFound";
import SignUp from "../pages/SignUp";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/cadastro" element={<SignUp />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/comprar" element={<Buy />} />
      <Route path="/trocar" element={<Exchange />} />
      <Route path="/extrato" element={<History />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default AppRoutes;
