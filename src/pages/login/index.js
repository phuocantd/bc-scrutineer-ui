import React, { useState } from "react";
import { connect } from "react-redux";
import axios from "axios";

import "./index.css";
import { signIn } from "actions/auth";

function Login({ dispatch }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [privateKey, setPrivateKey] = useState("");

  const handleLogin = (e) => {
    // dispatch(signIn("Authenticated"));
    e.preventDefault();
    axios({
      method: "POST",
      url: "http://localhost:3000/sign-in",
      data: {
        username,
        password,
        privateKey,
      },
    })
      .then((res) => {
        console.log(res);
        if (res.data.isSuccess) {
          dispatch(signIn(privateKey));
        } else {
        }
      })
      .catch((err) => console.log(err));
  };

  // const handleOk = (e) => {
  //   // console.log(e);
  //   dispatch(signIn("Authenticated"));
  //   // setVisible(false);
  // };

  // const handleCancel = (e) => {
  //   // console.log(e);
  //   setVisible(false);
  // };

  return (
    <div>
      <div className="login-box">
        <h2>Login</h2>
        <form>
          <div className="user-box">
            <input
              type="text"
              name=""
              required=""
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label>Username</label>
          </div>
          <div className="user-box">
            <input
              type="password"
              name=""
              required=""
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label>Password</label>
          </div>
          <div className="user-box">
            <input
              type="password"
              name=""
              required=""
              value={privateKey}
              onChange={(e) => setPrivateKey(e.target.value)}
            />
            <label>Private key</label>
          </div>
          <button className="btn-login" onClick={handleLogin}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Submit
          </button>
        </form>
      </div>
      {/* <Modal
        title="Private key"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <h2 className='text-modal'>Remember to save your private key</h2>
        <p className='text-modal'>MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCWhxvjktEHV6zvVgbUoRk8K3yj</p>
      </Modal> */}
    </div>
  );
}

export default connect()(Login);
