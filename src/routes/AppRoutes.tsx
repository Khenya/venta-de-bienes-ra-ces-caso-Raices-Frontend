import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import List from "../pages/List";
import Plano from "../pages/Plano";
import Login from "../pages/Login";

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/List/:token" element={<List />} />
      <Route path="/Plano" element={<Plano />} />
    </Routes>
  </Router>
);

export default AppRoutes;
