import { createContext, useReducer, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

// Helper function to safely parse localStorage
const safeParse = (key) => {
  try {
    const item = localStorage.getItem(key);
    if (item === null || item === "null") return null;
    return JSON.parse(item);
  } catch (e) {
    return null;
  }
};

const initialState = {
  currentUser: safeParse("user"),
  role: safeParse("role"),
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
  const [loading, setLoading] = useState(true);

  // Listen to Firebase auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // User is signed in
        console.log("Firebase auth state: User signed in", firebaseUser.uid);
        
        // Update current user
        dispatch({ type: "LOGIN", payload: firebaseUser.uid });

        // Load role from Firestore
        try {
          const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
          if (userDoc.exists()) {
            const role = userDoc.data().role;
            console.log("Role loaded from Firestore:", role);
            dispatch({ type: "LOGIN_ROLE", payload: role });
          } else {
            console.log("No Firestore document found for user");
            dispatch({ type: "LOGOUT_ROLE" });
          }
        } catch (error) {
          console.error("Error loading user role:", error);
          dispatch({ type: "LOGOUT_ROLE" });
        }
      } else {
        // User is signed out
        console.log("Firebase auth state: User signed out");
        dispatch({ type: "LOGOUT" });
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (state.currentUser) {
      localStorage.setItem("user", JSON.stringify(state.currentUser));
    } else {
      localStorage.removeItem("user");
    }
  }, [state.currentUser]);

  useEffect(() => {
    if (state.role) {
      localStorage.setItem("role", JSON.stringify(state.role));
    } else {
      localStorage.removeItem("role");
    }
  }, [state.role]);

  return (
    <AuthContext.Provider
      value={{
        currentUser: state.currentUser,
        role: state.role,
        loading,
        dispatchAuth: dispatch,
        dispatchAuthRole: dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
