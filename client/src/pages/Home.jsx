import { Link } from "react-router-dom";
import "./../styles/home.css";

function Home() {
  return (
    <div className="home">

      <nav className="navbar">

        <div className="logo">
          🏋️ Reborn Fitness
        </div>

        <Link
          to="/login"
          className="login-btn"
        >
          Login
        </Link>

      </nav>

      <section className="hero">

        <div className="overlay">

          <h1>
            Smart Gym Management
          </h1>

          <p>
            Manage Members, Track Memberships,
            Send Automatic Reminder Emails,
            and Grow Your Gym.
          </p>

          <div className="hero-buttons">

            <Link
              to="/login"
              className="btn-primary"
            >
              Get Started
            </Link>

            <Link
              to="/login"
              className="btn-secondary"
            >
              Admin Login
            </Link>

          </div>

        </div>

      </section>

      <section className="features">

        <h2>Features</h2>

        <div className="feature-grid">

          <div className="feature-card">
            👥
            <h4>Member Management</h4>
            <p>Add, Edit and Renew Members Easily</p>
          </div>

          <div className="feature-card">
            📧
            <h4>Email Reminders</h4>
            <p>Automatic Membership Expiry Emails</p>
          </div>

          <div className="feature-card">
            📊
            <h4>Dashboard</h4>
            <p>Track Active and Expired Members</p>
          </div>

          <div className="feature-card">
            🔒
            <h4>Secure</h4>
            <p>JWT Authentication</p>
          </div>

        </div>

      </section>

      <footer>

        © 2026 Reborn Fitness

      </footer>

    </div>
  );
}

export default Home;
