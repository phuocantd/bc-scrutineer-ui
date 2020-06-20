import { RESTORE_TOKEN, SIGN_IN, SIGN_OUT } from "constants/auth";

const initState = {
  isLoading: true,
  token: null,
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case RESTORE_TOKEN:
      return {
        ...state,
        isLoading: false,
        token: action.token,
      };

    case SIGN_IN:
      localStorage.setItem("access-token", action.token);
      return {
        ...state,
        token: action.token,
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
