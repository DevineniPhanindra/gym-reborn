import { useEffect, useState } from "react";
import api from "../services/api";
import { Link, useSearchParams } from "react-router-dom";
import Layout from "../components/Layout";
import "../styles/members.css";

function Members() {
const [members, setMembers] = useState([]);
const [search, setSearch] = useState("");

const [searchParams] = useSearchParams();
const filter = searchParams.get("filter");

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const res = await api.get("/members");
      setMembers(res.data.data);
    } catch (err) {
      console.log(err);
      alert("Failed to fetch members");
    }
  };

  const deleteMember = async (id) => {
    if (!window.confirm("Delete this member?")) return;

    try {
      await api.delete(`/members/${id}`);
      fetchMembers();
    } catch (err) {
      alert("Failed to delete member");
    }
  };

  const getRemainingDays = (endDate) => {
    const today = new Date();
    const expiry = new Date(endDate);

    today.setHours(0, 0, 0, 0);
    expiry.setHours(0, 0, 0, 0);

    return Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
  };

  const filteredMembers = members.filter((member) => {
  const query = search.toLowerCase().trim();

  const days = getRemainingDays(member.membership_end_date);

  const matchesSearch =
    member.name?.toLowerCase().includes(query) ||
    member.phone?.toLowerCase().includes(query) ||
    member.email?.toLowerCase().includes(query) ||
    member.id?.toString().includes(query);

  if (!matchesSearch) return false;

  switch (filter) {
    case "active":
      return days >= 0;

    case "expired":
      return days < 0;

    case "expiring":
      return days >= 0 && days <= 7;

    default:
      return true;
  }
});

  return (
    <Layout>
      <div className="container-fluid">

        {/* Header */}
        <div className="page-header">

          <div className="page-title">
            <h2>Members</h2>
            <p>Manage all gym members</p>
          </div>

          <Link
            to="/members/add"
            className="btn btn-primary px-4"
          >
            <i className="bi bi-person-plus me-2"></i>
            Add Member
          </Link>

        </div>

        {/* Toolbar */}

        <div className="toolbar">

          <div className="search-box">

            <i className="bi bi-search"></i>

            <input
              type="text"
              placeholder="Search by name, phone or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

          </div>

          <div>
            <span className="badge bg-primary fs-6 px-3 py-2">
              Showing {filteredMembers.length} of {members.length}
            </span>
          </div>

        </div>

        {/* Table */}

        <div className="table-card">

          <div className="table-responsive">

            <table className="table table-hover align-middle mb-0">

              <thead>

                <tr>
                  <th>Member</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Remaining</th>
                  <th>Status</th>
                  <th width="120">Actions</th>
                </tr>

              </thead>

              <tbody>

                {filteredMembers.length > 0 ? (

                  filteredMembers.map((member) => {

                    const days = getRemainingDays(
                      member.membership_end_date
                    );

                    return (

                      <tr key={member.id}>

                        <td>

                          <div className="member-info">

                            <div className="member-avatar">
                              {member.name.charAt(0).toUpperCase()}
                            </div>

                            <div>

                              <div className="fw-semibold">
                                {member.name}
                              </div>

                              <small className="text-muted">
                                ID #{member.id}
                              </small>

                            </div>

                          </div>

                        </td>

                        <td>{member.phone}</td>

                        <td>{member.email}</td>

                        <td>
                          {member.membership_start_date?.split("T")[0]}
                        </td>

                        <td>
                          {member.membership_end_date?.split("T")[0]}
                        </td>

                        <td>

                          {days < 0 ? (

                            <span className="badge bg-danger">
                              Expired
                            </span>

                          ) : days <= 7 ? (

                            <span className="badge bg-warning text-dark">
                              {days} Days
                            </span>

                          ) : (

                            <span className="badge bg-success">
                              {days} Days
                            </span>

                          )}

                        </td>

                       <td>
  <span
    className={`badge ${
      days >= 0 ? "bg-success" : "bg-danger"
    }`}
  >
    {days >= 0 ? "Active" : "Expired"}
  </span>
</td>

                        <td>

                          <div className="d-flex gap-2">

                            <Link
                              to={`/members/edit/${member.id}`}
                              className="action-btn action-edit d-flex justify-content-center align-items-center"
                            >
                              <i className="bi bi-pencil"></i>
                            </Link>

                            <button
                              className="action-btn action-delete d-flex justify-content-center align-items-center"
                              onClick={() =>
                                deleteMember(member.id)
                              }
                            >
                              <i className="bi bi-trash"></i>
                            </button>

                          </div>

                        </td>

                      </tr>

                    );
                  })

                ) : (

                  <tr>

                    <td
                      colSpan="8"
                      className="text-center py-5"
                    >

                      <i
                        className="bi bi-people"
                        style={{
                          fontSize: "45px",
                          color: "#9CA3AF",
                        }}
                      ></i>

                      <p className="mt-3 text-muted">
                        No members found.
                      </p>

                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>
    </Layout>

  );

}

export default Members;
