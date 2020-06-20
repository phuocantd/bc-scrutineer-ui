import React from "react";
import { connect } from "react-redux";

import { signOut } from "actions/auth";

function Profile({ dispatch }) {
  const handleSignout = () => {
    dispatch(signOut());
  };

  return (
    <div>
      <button onClick={handleSignout}>sign out</button>
    </div>
  );
}

export default connect()(Profile);
