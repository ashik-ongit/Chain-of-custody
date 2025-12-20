import { createContext, useReducer, useEffect } from "react";

const initialState = {
  currentUser: JSON.parse(localStorage.getItem("user")) || null,
  role: JSON.parse(localStorage.getItem("role")) || null,
};

function AuthReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        currentUser: action.payload,
      };
    case "LOGOUT":
      localStorage.removeItem("user");
      localStorage.removeItem("role");
      return {
        currentUser: null,
        role: null,
      };
    case "LOGIN_ROLE":
      return {
        ...state,
        role: action.payload,
      };
    case "LOGOUT_ROLE":
      return {
        ...state,
        role: null,
      };
    default:
      return state;
  }
}

export const AuthContext = createContext(initialState);

export const AuthContextProvider = ({ children }) => {
  console.log("🔵 AUTH CONTEXT LOADED");


  const [state, dispatch] = useReducer(AuthReducer, initialState);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.currentUser));
  }, [state.currentUser]);

  useEffect(() => {
    localStorage.setItem("role", JSON.stringify(state.role));
  }, [state.role]);

  return (
    <AuthContext.Provider
      value={{
        currentUser: state.currentUser,
        role: state.role,
        dispatchAuth: dispatch,
        dispatchAuthRole: dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
