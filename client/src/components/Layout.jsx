import { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import "../styles/layout.css";

function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="layout">

      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <main className="main-content">

        <Topbar
          setSidebarOpen={setSidebarOpen}
        />

        <div className="content">
          {children}
        </div>

      </main>

    </div>
  );
}

export default Layout;