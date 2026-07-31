import { useEffect, useState } from "react";
import api from "../services/api";
import Layout from "../components/Layout";
import DashboardCard from "../components/DashboardCard";
import { useNavigate } from "react-router-dom";

import "../styles/dashboard.css";

function Dashboard() {
  const [stats, setStats] = useState({
    total_members: 0,
    active_members: 0,
    expired_members: 0,
    expiring_soon: 0,
  });

  const [expiringMembers, setExpiringMembers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const statsRes = await api.get("/members/stats");
      setStats(statsRes.data.data);

      const expiringRes = await api.get("/members/expiring");
      setExpiringMembers(expiringRes.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getRemainingDays = (endDate) => {
    const today = new Date();
    const expiry = new Date(endDate);

    today.setHours(0, 0, 0, 0);
    expiry.setHours(0, 0, 0, 0);

    return Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
  };

 const cards = [
  {
    title: "Total Members",
    value: stats.total_members,
    icon: "bi-people-fill",
    color: "#4F46E5",
    filter: "",
  },
  {
    title: "Active Members",
    value: stats.active_members,
    icon: "bi-person-check-fill",
    color: "#22C55E",
    filter: "active",
  },
  {
    title: "Expired Members",
    value: stats.expired_members,
    icon: "bi-person-x-fill",
    color: "#EF4444",
    filter: "expired",
  },
  {
    title: "Expiring Soon",
    value: stats.expiring_soon,
    icon: "bi-clock-history",
    color: "#F59E0B",
    filter: "expiring",
  },
];

  return (
    <Layout>
      {/* Page Header */}
      <div className="mb-4">
        <h2 className="fw-bold">Dashboard</h2>
        <p className="text-muted">
          Welcome back! Here's an overview of your gym.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid mb-4">
        {cards.map((card) => (
  <div
    key={card.title}
    style={{ cursor: "pointer" }}
    onClick={() =>
      navigate(
        card.filter
          ? `/members?filter=${card.filter}`
          : "/members"
      )
    }
  >
    <DashboardCard
      title={card.title}
      value={card.value}
      icon={card.icon}
      color={card.color}
    />
  </div>
))}
      </div>

      {/* Expiring Members */}
      <div className="card border-0 shadow-sm rounded-4">

        <div className="card-header bg-white border-0 py-3">
          <div className="d-flex justify-content-between align-items-center">

            <div>
              <h5 className="fw-bold mb-1">
                Memberships Expiring Soon
              </h5>

              <small className="text-muted">
                Members whose memberships expire within 7 days
              </small>
            </div>

            <span className="badge bg-warning text-dark px-3 py-2">
              {expiringMembers.length} Members
            </span>

          </div>
        </div>

        <div className="table-responsive">

          <table className="table align-middle table-hover mb-0">

            <thead className="table-light">

              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Expiry Date</th>
                <th>Remaining</th>
              </tr>

            </thead>

            <tbody>

              {expiringMembers.length > 0 ? (
                expiringMembers.map((member) => (
                  <tr key={member.id}>

                    <td className="fw-semibold">
                      {member.name}
                    </td>

                    <td>{member.phone}</td>

                    <td>{member.email}</td>

                    <td>
                      {member.membership_end_date.split("T")[0]}
                    </td>

                    <td>

                      <span
                        className={`badge ${
                          getRemainingDays(member.membership_end_date) <= 3
                            ? "bg-danger"
                            : "bg-warning text-dark"
                        }`}
                      >
                        {getRemainingDays(member.membership_end_date)} Days
                      </span>

                    </td>

                  </tr>
                ))
              ) : (
                <tr>

                  <td
                    colSpan="5"
                    className="text-center py-5 text-muted"
                  >
                    <i
                      className="bi bi-check-circle-fill"
                      style={{
                        fontSize: "40px",
                        color: "#22C55E",
                      }}
                    ></i>

                    <p className="mt-3 mb-0">
                      No memberships expiring soon.
                    </p>

                  </td>

                </tr>
              )}

            </tbody>

          </table>

        </div>

      </div>

    </Layout>
  );
}

export default Dashboard;
