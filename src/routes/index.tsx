import { Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import PageNotFound from "../pages/PageNotFound";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default AppRoutes;
