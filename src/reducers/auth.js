import { RESTORE_TOKEN, SIGN_IN, SIGN_OUT, SIGN_UP } from "constants/auth";

const initState = {
  isLoading: true,
  privateKey: null,
  publicKey: null,
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case RESTORE_TOKEN:
      return {
        ...state,
        isLoading: false,
        privateKey: action.privateKey,
        publicKey: action.publicKey,
      };

    case SIGN_IN:
      localStorage.setItem("privateKey", action.privateKey);
      return {
        ...state,
        privateKey: action.privateKey,
        token: action.privateKey,
      };
    case SIGN_UP:
      localStorage.setItem("access-token", action.token);
      return {
        ...state,
        privateKey: action.privateKey,
        publicKey: action.publicKey,
      };
    case SIGN_OUT:
      localStorage.removeItem("access-token");
      return {
        ...state,
        token: null,
      };
    default:
      return state;
  }
};

export default authReducer;
