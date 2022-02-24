import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../actions/userActions";
import Loading from "./Loading";
import "../App.css";
export default function SignInPage() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo, error, loading } = userLogin;
  const dispatch = useDispatch();
  const history = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginAction(email, password));
  };
  useEffect(() => {
    if (userInfo) {
      history("/");
    }
  }, []);
  useEffect(() => {
    if (userInfo) {
      history("/");
    }
  }, [userLogin]);
  return (
    <div className="text-center screen">
      {loading ? (
        <Loading />
      ) : (
        <div>
          <h2>SIGN IN</h2>
          <form onSubmit={handleSubmit}>
            {error && (
              <div
                style={{
                  borderRadius: "2.5px",
                  backgroundColor: "pink",
                  textAlign: "left",
                  marginBottom: "1em",
                  paddingLeft: "5px",
                  color: "red",
                  fontSize: "13px",
                  fontWeight: "500",
                }}
              >
                {error}
              </div>
            )}
            <p>
              <label>Email</label>
              <br />
              <input
                type="text"
                name="email"
                value={email}
                onChange={handleEmail}
                required
              />
            </p>
            <p>
              <label>Password</label>
              <Link to="/forget-password" style={{ color: "#ffc107" }}>
                <label className="right-label">Forget password?</label>
              </Link>
              <br />
              <input
                type="password"
                name="password"
                value={password}
                onChange={handlePassword}
                required
              />
            </p>
            <p>
              <button
                id="sub_btn"
                type="submit"
                style={{ backgroundColor: "#dc3545" }}
              >
                Login
              </button>
            </p>
          </form>
          <footer>
            <p>
              First time?{" "}
              <Link to="/register" style={{ color: "#ffc107" }}>
                Create an account
              </Link>
            </p>
          </footer>
        </div>
      )}
    </div>
  );
}
