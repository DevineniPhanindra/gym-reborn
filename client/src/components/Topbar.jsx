import "../styles/topbar.css";

function Topbar({ setSidebarOpen }) {
  return (
    <header className="topbar">

      <div className="topbar-left">
        <button
          className="menu-btn"
          onClick={() => setSidebarOpen(true)}
        >
          <i className="bi bi-list"></i>
        </button>
      </div>

      <h1 className="topbar-title">
    <span className="reborn">REBORN</span>{" "}
    <span className="fitness">FITNESS</span>
    </h1>

      <div className="topbar-right">
        <div className="admin">
          <img
            src="https://ui-avatars.com/api/?name=Admin&background=4F46E5&color=fff"
            alt="Admin"
          />

          <div className="admin-info">
            <h6>Admin</h6>
            <small>Administrator</small>
          </div>
        </div>
      </div>

    </header>
  );
}

export default Topbar;