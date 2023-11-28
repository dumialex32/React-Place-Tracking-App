/* eslint-disable react/prop-types */
import { createContext, useEffect, useReducer } from "react";

const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthentificated: false,
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return {
        ...state,
        user: action.payload,
        isAuthentificated: true,
        error: "",
      };

    case "logout":
      return { ...state, user: null, isAuthentificated: false };

    case "authFailed":
      return { ...state, error: action.payload };

    case "resetAuth":
      return { ...state, error: "" };

    default:
      throw new Error("Unknown action");
  }
}

function AuthProvider({ children }) {
  const [{ user, isAuthentificated, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  console.log(isAuthentificated);

  function login(email, pasword) {
    email === FAKE_USER.email && pasword === FAKE_USER.password
      ? dispatch({ type: "login", payload: FAKE_USER })
      : dispatch({
          type: "authFailed",
          payload: "Wrong email or password. Please try again",
        });
  }

  function logout() {
    dispatch({ type: "logout" });
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthentificated, login, logout, error, dispatch }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider, AuthContext };
