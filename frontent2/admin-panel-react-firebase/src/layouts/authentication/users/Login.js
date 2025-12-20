import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

// Authentication
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase";
import { AuthContext } from "context/AuthContext";

// @mui material components
import { CircularProgress, Card, TextField } from "@mui/material";
import { green } from "@mui/material/colors";
import * as React from "react";

// Admin panel components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Layout
import BasicLayoutLogin from "layouts/authentication/BasicLayoutLogin";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";

// Firestore
import { db } from "../../../firebase";
import { doc, getDoc } from "firebase/firestore";

const Login = () => {
  const [loading, setLoading] = React.useState(false);
  const [loginError, setLoginError] = useState(false);
  const [loginUser, setLoginUser] = useState({
    email: "",
    password: "",
  });

  const { dispatchAuth, dispatchAuthRole } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setLoginError(false);

    try {
      console.log("Attempting Firebase login:", loginUser.email);

      const userCredential = await signInWithEmailAndPassword(
        auth,
        loginUser.email,
        loginUser.password
      );

      const user = userCredential.user;
      console.log("Firebase login success:", user.uid);

      // Save UID
      dispatchAuth({ type: "LOGIN", payload: user.uid });

      // Load Firestore role
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (!userDoc.exists()) {
        console.log("No Firestore document for this UID");
        setLoginError(true);
        setLoading(false);
        return;
      }

      const role = userDoc.data().role;
      

      
      console.log("Role loaded:", role);

      // Save role to AuthContext
      dispatchAuthRole({ type: "LOGIN_ROLE", payload: role });

      // Delay redirect to allow context to update
      setTimeout(() => {
        console.log("Redirecting to:", `/${role}/dashboard`);
        navigate(`/${role}/dashboard`);
      }, 150);

      setLoginUser({ email: "", password: "" });
      setLoading(false);

    } catch (error) {
      console.error("LOGIN ERROR:", error);
      setLoginError(true);
      setLoading(false);
    }
  };

  return (
    <>
      <BasicLayoutLogin image={bgImage}>
        <Card>
          <MDBox
            variant="gradient"
            bgColor="info"
            borderRadius="lg"
            coloredShadow="info"
            mx={2}
            mt={-3}
            p={2}
            mb={1}
            textAlign="center"
          >
            <MDTypography variant="h5" fontWeight="medium" color="white" mt={1}>
              LOGIN
            </MDTypography>
          </MDBox>

          <MDBox pt={4} pb={3} px={3}>
            <MDBox component="form" role="form">
              <MDBox mb={2}>
                {loginError && (
                  <MDBox mb={2} p={1}>
                    <TextField
                      fullWidth
                      InputProps={{
                        readOnly: true,
                        sx: {
                          "& input": {
                            color: "red",
                          },
                        },
                      }}
                      error
                      label="Error"
                      defaultValue="Wrong email or password!"
                      variant="standard"
                    />
                  </MDBox>
                )}

                <MDInput
                  value={loginUser.email}
                  onChange={(e) =>
                    setLoginUser({ ...loginUser, email: e.target.value })
                  }
                  type="email"
                  label="Email"
                  fullWidth
                  required
                />
              </MDBox>

              <MDBox mb={2}>
                <MDInput
                  value={loginUser.password}
                  onChange={(e) =>
                    setLoginUser({ ...loginUser, password: e.target.value })
                  }
                  type="password"
                  label="Password"
                  fullWidth
                  required
                />
              </MDBox>

              <MDBox
                mt={4}
                mb={1}
                sx={{
                  display: "flex",
                  direction: "row",
                  justifyContent: "center",
                }}
              >
                {loading ? (
                  <CircularProgress
                    size={30}
                    sx={{
                      color: green[500],
                      justifyContent: "center",
                    }}
                  />
                ) : (
                  <MDButton
                    variant="gradient"
                    color="info"
                    fullWidth
                    type="submit"
                    onClick={handleLogin}
                  >
                    LOGIN
                  </MDButton>
                )}
              </MDBox>
            </MDBox>
          </MDBox>
        </Card>
      </BasicLayoutLogin>
    </>
  );
};

export default Login;
