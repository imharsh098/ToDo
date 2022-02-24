import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import { registerAction } from "../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import Loading from "./Loading";
export default function SignUpPage() {
  const dispatch = useDispatch();
  const history = useNavigate();
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;
  const [state, setState] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const handleChange = (e) => {
    setState({ ...state, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerAction(state));
    setState({ name: "", email: "", phone: "", password: "" });
  };
  useEffect(() => {
    if (userInfo) {
      history("/");
    }
  }, [userRegister]);
  return (
    <div className="screen">
      {loading ? (
        <Loading />
      ) : (
        <div className="text-center">
          <h2>JOIN US</h2>
          <form style={{ backgroundColor: "#efebeb" }} onSubmit={handleSubmit}>
            {error && (
              <div
                style={{
                  width: "15rem",
                  borderRadius: "2.5px",
                  backgroundColor: "pink",
                  textAlign: "left",
                  marginBottom: "1em",
                  padding: "3px 3px 3px 7px",
                  color: "red",
                  fontSize: "13px",
                  fontWeight: "500",
                  overflowWrap: "break-word",
                }}
              >
                {error}
              </div>
            )}
            <p>
              <label>Name</label>
              <br />
              <input
                type="text"
                name="name"
                id="name"
                value={state.name}
                onChange={handleChange}
                required
              />
            </p>
            <p>
              <label>Email address</label>
              <br />
              <input
                type="email"
                name="email"
                id="email"
                value={state.email}
                onChange={handleChange}
                required
              />
            </p>
            <p>
              <label>Phone</label>
              <br />
              <input
                type="tel"
                name="phone"
                id="phone"
                onChange={handleChange}
                value={state.phone}
                required
              />
            </p>
            <p>
              <label>Password</label>
              <br />
              <input
                type="password"
                name="password"
                id="password"
                onChange={handleChange}
                value={state.password}
                required
              />
            </p>
            <p>
              <button
                id="sub_btn"
                type="submit"
                style={{ backgroundColor: "#dc3545" }}
              >
                Register
              </button>
            </p>
          </form>
          <footer>
            <p>
              <Link to="/login" style={{ color: "#ffc107" }}>
                Sign In to an already existing account
              </Link>
              .
            </p>
          </footer>
        </div>
      )}
    </div>
  );
}
