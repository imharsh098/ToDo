import React from "react";
import { Link } from "react-router-dom";

import "../App.css";

export default function ForgetPasswordPage() {
  return (
    <div className="text-center screen">
      <h2>RESET PASSWORD</h2>
      <form action="/login">
        <p>
          <label id="reset_pass_lbl">Email address</label>
          <br />
          <input type="email" name="email" required />
        </p>
        <p>
          <button
            id="sub_btn"
            type="submit"
            style={{ backgroundColor: "#dc3545" }}
          >
            Send password reset email
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
        <p>
          <Link to="/" style={{ color: "#ffc107" }}>
            Back to Homepage
          </Link>
        </p>
      </footer>
    </div>
  );
}
