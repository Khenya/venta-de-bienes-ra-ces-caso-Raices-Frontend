import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import List from "../pages/List";
import Plano from "../pages/Plano";
import Login from "../pages/Login";
import Edit from "../pages/Edit";

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/List/:token" element={<List />} />
      <Route path="/Plano" element={<Plano />} />
      <Route path="/Edit/:token" element={<Edit />} />
    </Routes>
  </Router>
);

export default AppRoutes;
