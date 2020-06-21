import React, { useState } from "react";
import { connect } from "react-redux";
import Modal from "antd/lib/modal/Modal";

import "./index.css";
import { signUp } from "actions/auth";

function Login({ dispatch }) {
  const [visible, setVisible] = useState(false);

  const handleLogin = (e) => {
    // dispatch(signIn("Authenticated"));
    e.preventDefault();
    setVisible(true);
  };

  const handleOk = (e) => {
    // console.log(e);
    dispatch(signUp("Authenticated"));
    // setVisible(false);
  };

  const handleCancel = (e) => {
    // console.log(e);
    setVisible(false);
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
          <button className="btn-login" onClick={handleLogin}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Submit
          </button>
        </form>
      </div>
      <Modal
        title="Private key"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <h2 className="text-modal">Remember to save your private key</h2>
        <p className="text-modal">
          MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCWhxvjktEHV6zvVgbUoRk8K3yj
        </p>
      </Modal>
    </div>
  );
}

export default connect()(Login);
