import React from "react";
import { connect } from "react-redux";

import "./index.css";
import { signIn } from "actions/auth";

function Login({ dispatch }) {
  const handleLogin = () => {
    dispatch(signIn("Authenticated"));
  };

  return (
    <div>
      <div className="login-box">
        <h2>Login</h2>
        <form>
          <div className="user-box">
            <input type="text" name="" required="" />
            <label>Username</label>
          </div>
          <div className="user-box">
            <input type="password" name="" required="" />
            <label>Password</label>
          </div>
          <button className='btn-login' onClick={handleLogin}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default connect()(Login);
