import { RESTORE_TOKEN, SIGN_OUT, SIGN_IN, SIGN_UP } from "constants/auth";

export const restoreToken = (token) => ({ type: RESTORE_TOKEN, token });

export const signIn = (privateKey) => ({ type: SIGN_IN, privateKey });

export const signOut = () => ({ type: SIGN_OUT });

export const signUp = (token) => ({ type: SIGN_UP, token });
