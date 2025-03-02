import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import List from "../pages/List";
import Map from "../pages/map";
import Login from "../pages/Login";
import Edit from "../pages/Edit";

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/list/:token" element={<List />} />
      <Route path="/map" element={<Map />} />
      <Route path="/edit/:token" element={<Edit />} />
    </Routes>
  </Router>
);

export default AppRoutes;
