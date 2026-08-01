import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/login.css";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      alert("Please enter username and password");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/auth/login", {
        username,
        password,
      });

      localStorage.setItem("token", res.data.token);

      navigate("/dashboard");
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Invalid username or password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">

      {/* LEFT PANEL */}

      <div className="login-left">

        <div className="brand">

          <img
            src="/favcon.png"
            alt="Reborn Fitness"
            className="brand-logo"
          />

          <h1>REBORN FITNESS</h1>

          <h3>Gym Management System</h3>

          <p>
            Manage members, automate renewals,
            send reminder emails and grow your
            fitness business effortlessly.
          </p>

          <div className="feature-list">

            <div className="feature">
              ✅ Member Management
            </div>

            <div className="feature">
              ✅ Automatic Email Reminders
            </div>

            <div className="feature">
              ✅ Dashboard Analytics
            </div>

            <div className="feature">
              ✅ Secure Admin Portal
            </div>

          </div>

        </div>

      </div>

      {/* RIGHT PANEL */}

      <div className="login-right">

        <div className="login-box">

          <Link
            to="/"
            className="back-home"
          >
            <i className="bi bi-arrow-left me-2"></i>
            Back to Home
          </Link>

          <h2>Admin Portal</h2>

          <p>
            Welcome back! Please login to continue.
          </p>

          <form onSubmit={handleLogin}>

            <div className="input-group">

              <label>Username</label>

              <input
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />

            </div>

            <div className="input-group">

              <label>Password</label>

              <div className="password-box">

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <button
                  type="button"
                  className="eye-btn"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                >
                  <i
                    className={`bi ${
                      showPassword
                        ? "bi-eye-slash-fill"
                        : "bi-eye-fill"
                    }`}
                  ></i>
                </button>

              </div>

            </div>

            <button
              type="submit"
              className="login-btn"
              disabled={loading}
            >
              {loading ? "Signing In..." : "Login"}
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}

export default Login;
