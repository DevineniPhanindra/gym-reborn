import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Members from "./pages/Members";
import AddMember from "./pages/AddMember";
import EditMember from "./pages/EditMember";
import ChangePassword from "./pages/ChangePassword";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/members" element={<Members />} />

        <Route path="/members/add" element={<AddMember />} />

        <Route path="/members/edit/:id" element={<EditMember />} />

        <Route
          path="/change-password"
          element={<ChangePassword />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
