import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Layout from "../components/Layout";
import "../styles/forms.css";

function AddMember() {
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
  });

  const handleChange = (e) => {
    setMember({
      ...member,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/members", member);
      alert("Member Added Successfully");
      navigate("/members");
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <Layout>
      <div className="container-fluid">

        {/* Header */}
        <div className="mb-4">
          <h2 className="form-title">Add New Member</h2>
          <p className="form-subtitle">
            Fill in the details to register a new gym member.
          </p>
        </div>

        {/* Form Card */}
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
                  type="text"
                  className="form-control"
                  name="name"
                  value={member.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <label>Phone Number</label>
                <input
                  type="text"
                  className="form-control"
                  name="phone"
                  value={member.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <label>Email Address</label>
                <input
                  type="email"
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
                  <option value="">Select Gender</option>
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

            <hr className="my-4" />

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

              <div className="col-12">
                <label>Address</label>
                <textarea
                  className="form-control"
                  rows="4"
                  name="address"
                  value={member.address}
                  onChange={handleChange}
                />
              </div>

            </div>

            <div className="mt-5 d-flex gap-3">

              <button
                type="submit"
                className="btn btn-save text-white"
              >
                <i className="bi bi-check-circle me-2"></i>
                Save Member
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

export default AddMember;