import { NavLink, useNavigate } from "react-router-dom";
import "../styles/sidebar.css";

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <>
      <aside className={`sidebar ${sidebarOpen ? "show" : ""}`}>

        {/* Close Button (Mobile Only) */}
        <button
          className="close-btn"
          onClick={closeSidebar}
        >
          <i className="bi bi-x-lg"></i>
        </button>

        {/* Logo */}
        <div className="logo-section">
          <div className="logo-icon">
            <i className="bi bi-activity"></i>
          </div>

          <div>
            <h4 >Reborn Fitness</h4>
            <span>Management System</span>
          </div>
        </div>

        {/* User */}
        <div className="user-card">
          <div className="user-avatar">A</div>

          <div>
            <h6>Admin</h6>
            <small>Administrator</small>
          </div>
        </div>

        {/* Menu */}
        <p className="menu-title">MAIN MENU</p>

        <nav>

          <NavLink
            to="/dashboard"
            className="menu-link"
            onClick={closeSidebar}
          >
            <i className="bi bi-grid"></i>
            Dashboard
          </NavLink>

          <NavLink
            to="/members"
            className="menu-link"
            onClick={closeSidebar}
          >
            <i className="bi bi-people"></i>
            Members
          </NavLink>

          <NavLink
            to="/members/add"
            className="menu-link"
            onClick={closeSidebar}
          >
            <i className="bi bi-person-plus"></i>
            Add Member
          </NavLink>

        </nav>

        {/* Logout */}
        <button
          onClick={logout}
          className="logout-btn"
        >
          <i className="bi bi-box-arrow-left"></i>
          Logout
        </button>

      </aside>

      {/* Overlay */}
      <div
        className={`sidebar-overlay ${sidebarOpen ? "show" : ""}`}
        onClick={closeSidebar}
      ></div>
    </>
  );
}

export default Sidebar;