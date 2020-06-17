import { RESTORE_TOKEN, SIGN_OUT, SIGN_IN } from "constants/auth";

export const restoreToken = (token) => ({ type: RESTORE_TOKEN, token });

export const signIn = (token) => ({ type: SIGN_IN, token });

export const signOut = () => ({ type: SIGN_OUT });
