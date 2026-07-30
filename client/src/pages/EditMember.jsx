import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import Layout from "../components/Layout";
import "../styles/forms.css";

function EditMember() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [member, setMember] = useState({
    name: "",
    phone: "",
    email: "",
    gender: "",
    age: "",
    address: "",
    join_date: "",
    membership_start_date: "",
    membership_end_date: "",
    status: "Active",
  });

  useEffect(() => {
    fetchMember();
  }, []);

  const fetchMember = async () => {
    try {
      const res = await api.get(`/members/${id}`);

      const data = res.data.data;

      setMember({
        ...data,
        join_date: data.join_date?.split("T")[0] || "",
        membership_start_date:
          data.membership_start_date?.split("T")[0] || "",
        membership_end_date:
          data.membership_end_date?.split("T")[0] || "",
      });
    } catch (err) {
      alert("Failed to load member");
    }
  };

  const handleChange = (e) => {
    setMember({
      ...member,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.put(`/members/${id}`, member);

      alert("Member Updated Successfully");
      navigate("/members");
    } catch (err) {
      alert(err.response?.data?.message || "Update failed");
    }
  };

  return (
    <Layout>
      <div className="container-fluid">

        <div className="mb-4">
          <h2 className="form-title">Edit Member</h2>
          <p className="form-subtitle">
            Update member information.
          </p>
        </div>

        <div className="form-card">

          <form onSubmit={handleSubmit}>

            <h5 className="form-section">
              <i className="bi bi-person-fill me-2"></i>
              Personal Information
            </h5>

            <div className="row g-4">

              <div className="col-md-6">
                <label>Full Name</label>

                <input
                  className="form-control"
                  name="name"
                  value={member.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <label>Phone</label>

                <input
                  className="form-control"
                  name="phone"
                  value={member.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <label>Email</label>

                <input
                  className="form-control"
                  name="email"
                  value={member.email}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <label>Gender</label>

                <select
                  className="form-select"
                  name="gender"
                  value={member.gender}
                  onChange={handleChange}
                >
                  <option>Male</option>
                  <option>Female</option>
                </select>
              </div>

              <div className="col-md-6">
                <label>Age</label>

                <input
                  type="number"
                  className="form-control"
                  name="age"
                  value={member.age}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <label>Join Date</label>

                <input
                  type="date"
                  className="form-control"
                  name="join_date"
                  value={member.join_date}
                  onChange={handleChange}
                />
              </div>

            </div>

            <hr className="my-4"/>

            <h5 className="form-section">
              <i className="bi bi-calendar-check me-2"></i>
              Membership Details
            </h5>

            <div className="row g-4">

              <div className="col-md-6">
                <label>Membership Start</label>

                <input
                  type="date"
                  className="form-control"
                  name="membership_start_date"
                  value={member.membership_start_date}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <label>Membership End</label>

                <input
                  type="date"
                  className="form-control"
                  name="membership_end_date"
                  value={member.membership_end_date}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <label>Status</label>

                <select
                  className="form-select"
                  name="status"
                  value={member.status}
                  onChange={handleChange}
                >
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </div>

              <div className="col-12">
                <label>Address</label>

                <textarea
                  rows="4"
                  className="form-control"
                  name="address"
                  value={member.address}
                  onChange={handleChange}
                />
              </div>

            </div>

            <div className="mt-5 d-flex gap-3">

              <button
                className="btn btn-save text-white"
                type="submit"
              >
                <i className="bi bi-check-circle me-2"></i>
                Update Member
              </button>

              <button
                type="button"
                className="btn btn-outline-secondary btn-cancel"
                onClick={() => navigate("/members")}
              >
                <i className="bi bi-arrow-left me-2"></i>
                Cancel
              </button>

            </div>

          </form>

        </div>

      </div>
    </Layout>
  );
}

export default EditMember;