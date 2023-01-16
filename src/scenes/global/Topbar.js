import React, { useState } from "react";
import { Box, IconButton, Modal, useTheme, Typography } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import axios from "axios";

const initialValues = {
  mobileNumber: "",
  password: "",
  confirmPassword: "",
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const loginUserSchema = yup.object().shape({
  mobileNumber: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
  password: yup.string().required("required"),
});

const signUpUserSchema = yup.object().shape({
  mobileNumber: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
  password: yup.string().required("required"),
  confirmPassword: yup.string().required("required"),
});

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const [accountOpen, setAccountOpen] = useState(false);
  const [login, setLogin] = useState(false);
  const [signup, setSignup] = useState(false);
  const [accessToken, setAccessToken] = useState(false);

  const handleAccountModal = () => {
    if (localStorage.getItem("accessToken") != null) {
      setAccessToken(true);
    } else {
      setAccountOpen(true);
    }
  };

  const handleClose = () => {
    setAccountOpen(false);
  };

  const handleLoginFormSubmit = async (values) => {
    try {
      await axios
        .post("http://localhost:3001/auth/login", {
          mobile_number: values.mobileNumber,
          password: values.password,
        })
        .then((res) => {
          console.log(res.data.access_token);
          localStorage.setItem("accessToken", res.data.access_token);
          alert("Login successful");
          setSignup(false);
          window.location.reload();
        })
        .catch((err) => {
          alert("Login Failed, please check your credentials");
        });
    } catch (err) {
      console.log(err);
    }
    setLogin(false);
  };

  const handleSignupFormSubmit = async (values) => {
    if (values.password != values.confirmPassword) {
      alert("Please enter correct password");
      return;
    }

    try {
      await axios
        .post("http://localhost:3001/auth/signup", {
          mobile_number: values.mobileNumber,
          password: values.password,
        })
        .then((res) => {
          console.log(res);
          alert("Successfully registered, please login now!");
        })
        .catch((err) => {
          alert("Registration failed, Please try again");
        });
    } catch (err) {
      console.log(err);
    }
    setSignup(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    window.location.reload();
  };

  return (
    <>
      <Box display="flex" justifyContent="space-between" p={2}>
        {/* Search Box */}
        <Box
          display="flex"
          backgroundColor={colors.primary[400]}
          borderRadius="3px"
        >
          {/* <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" /> */}
          {/* <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton> */}
        </Box>

        {/* Icons */}
        <Box display="flex">
          <IconButton onClick={colorMode.toggleColorMode}>
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlinedIcon />
            ) : (
              <LightModeOutlinedIcon />
            )}
          </IconButton>
          <IconButton>
            <NotificationsOutlinedIcon />
          </IconButton>
          <IconButton>
            <SettingsOutlinedIcon />
          </IconButton>
          <IconButton onClick={handleAccountModal}>
            <PersonOutlinedIcon />
          </IconButton>
        </Box>
      </Box>
      {accessToken ? (
        <Modal
          open={accessToken}
          onClose={() => {
            setAccessToken(false);
          }}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            margin: "50px 10px 0 0",
            alignItems: "flex-start",
          }}
        >
          <Box
            sx={{
              border: "1px solid black",
              padding: "0 5px 0",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              background: "rgba(255,255,255,0.09)",
              borderRadius: "13px",
              boxShadow: "0 4px 30px rgba(0,0,0,0.1)",
              backdropFilter: "blur(2.3px)",
              WebkitBackdropFilter: "blur(2.3px)",
              border: "1px solid rgba(255,255,255,0.45)",
              transition: "all 1s",
              cursor: "pointer",
            }}
          >
            <h1 onClick={handleLogout}>Logout</h1>
          </Box>
        </Modal>
      ) : null}

      {!accessToken && accountOpen ? (
        <Modal
          open={accountOpen}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            margin: "50px 10px 0 0",
            alignItems: "flex-start",
          }}
        >
          <Box
            sx={{
              border: "1px solid black",
              width: "15%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              background: "rgba(255,255,255,0.09)",
              borderRadius: "13px",
              boxShadow: "0 4px 30px rgba(0,0,0,0.1)",
              backdropFilter: "blur(2.3px)",
              WebkitBackdropFilter: "blur(2.3px)",
              border: "1px solid rgba(255,255,255,0.45)",
              transition: "all 1s",
            }}
          >
            <Button
              sx={{ color: "white", fontSize: "15px" }}
              onClick={() => {
                setLogin(true);
                setAccountOpen(false);
              }}
            >
              Login
            </Button>
            <Button
              sx={{ color: "white", fontSize: "15px" }}
              onClick={() => {
                setSignup(true);
                setAccountOpen(false);
              }}
            >
              Signup
            </Button>
          </Box>
        </Modal>
      ) : login ? (
        <Modal
          open={login}
          onClose={() => setLogin(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          sx={{
            display: "flex",
            justifyContent: "center",
            margin: "120px 0 0 0",
            alignItems: "flex-start",
          }}
        >
          <Formik
            onSubmit={handleLoginFormSubmit}
            initialValues={initialValues}
            validationSchema={loginUserSchema}
          >
            {({
              values,
              errors,
              touched,
              handleBlur,
              handleChange,
              handleSubmit,
            }) => (
              <form onSubmit={handleSubmit}>
                <Box
                  sx={{
                    border: "1px solid black",
                    padding: "10px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    background: "rgba(255,255,255,0.09)",
                    borderRadius: "13px",
                    boxShadow: "0 4px 30px rgba(0,0,0,0.1)",
                    backdropFilter: "blur(2.3px)",
                    WebkitBackdropFilter: "blur(2.3px)",
                    border: "1px solid rgba(255,255,255,0.45)",
                    transition: "all 1s",
                  }}
                >
                  <Typography variant="h2" color="white">
                    LOGIN
                  </Typography>
                  <hr />
                  <TextField
                    fullWidth
                    variant="outlined"
                    type="text"
                    label="Mobile Number"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.mobileNumber}
                    name="mobileNumber"
                    error={!!touched.mobileNumber && !!errors.mobileNumber}
                    helperText={touched.mobileNumber && errors.mobileNumber}
                    inputProps={{
                      style: {
                        fontSize: 35,
                        color: "white",
                      },
                    }}
                    InputLabelProps={{
                      style: { fontSize: 15, color: "white" },
                    }}
                  />
                  <TextField
                    sx={{
                      m: "20px",
                    }}
                    fullWidth
                    variant="outlined"
                    type="password"
                    label="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.password}
                    name="password"
                    error={!!touched.password && !!errors.password}
                    helperText={touched.password && errors.password}
                    inputProps={{
                      style: {
                        fontSize: 35,
                        color: "white",
                      },
                    }}
                    InputLabelProps={{
                      style: {
                        fontSize: 15,
                        color: "white",
                        m: 10,
                      },
                    }}
                  />
                  <Button
                    type="submit"
                    sx={{
                      color: "white",
                      border: "1px solid white",
                      width: "100%",
                      margin: "20px 0 0 0",
                      padding: "10px 0",
                      fontSize: "20px",
                      borderRadius: "10px",
                    }}
                  >
                    Login
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Modal>
      ) : signup ? (
        <Modal
          open={signup}
          onClose={() => {
            setLogin(false);
            setSignup(false);
          }}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          sx={{
            display: "flex",
            justifyContent: "center",
            margin: "120px 0 0 0",
            alignItems: "flex-start",
          }}
        >
          <Formik
            onSubmit={handleSignupFormSubmit}
            initialValues={initialValues}
            validationSchema={signUpUserSchema}
          >
            {({
              values,
              errors,
              touched,
              handleBlur,
              handleChange,
              handleSubmit,
            }) => (
              <form onSubmit={handleSubmit}>
                <Box
                  sx={{
                    border: "1px solid black",
                    padding: "10px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    background: "rgba(255,255,255,0.09)",
                    borderRadius: "13px",
                    boxShadow: "0 4px 30px rgba(0,0,0,0.1)",
                    backdropFilter: "blur(2.3px)",
                    WebkitBackdropFilter: "blur(2.3px)",
                    border: "1px solid rgba(255,255,255,0.45)",
                    transition: "all 1s",
                  }}
                >
                  <Typography variant="h2" color="white">
                    Signup
                  </Typography>
                  <hr sx={{ width: "100%" }} />
                  <TextField
                    fullWidth
                    variant="outlined"
                    type="text"
                    label="Mobile Number"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.mobileNumber}
                    name="mobileNumber"
                    error={!!touched.mobileNumber && !!errors.mobileNumber}
                    helperText={touched.mobileNumber && errors.mobileNumber}
                    inputProps={{
                      style: {
                        fontSize: 35,
                        color: "white",
                      },
                    }}
                    InputLabelProps={{
                      style: { fontSize: 15, color: "white" },
                    }}
                  />
                  <TextField
                    sx={{
                      m: "20px",
                    }}
                    fullWidth
                    variant="outlined"
                    type="password"
                    label="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.password}
                    name="password"
                    error={!!touched.password && !!errors.password}
                    helperText={touched.password && errors.password}
                    inputProps={{
                      style: {
                        fontSize: 35,
                        color: "white",
                      },
                    }}
                    InputLabelProps={{
                      style: {
                        fontSize: 15,
                        color: "white",
                        m: 10,
                      },
                    }}
                  />
                  <TextField
                    sx={{
                      m: "20px",
                    }}
                    fullWidth
                    variant="outlined"
                    type="password"
                    label="confirm password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.confirmPassword}
                    name="confirmPassword"
                    error={
                      !!touched.confirmPassword && !!errors.confirmPassword
                    }
                    helperText={
                      touched.confirmPassword && errors.confirmPassword
                    }
                    inputProps={{
                      style: {
                        fontSize: 35,
                        color: "white",
                      },
                    }}
                    InputLabelProps={{
                      style: {
                        fontSize: 15,
                        color: "white",
                        m: 10,
                      },
                    }}
                  />
                  <Button
                    type="submit"
                    sx={{
                      color: "white",
                      border: "1px solid white",
                      width: "100%",
                      margin: "20px 0 0 0",
                      padding: "10px 0",
                      fontSize: "20px",
                      borderRadius: "10px",
                    }}
                  >
                    Register
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Modal>
      ) : null}
    </>
  );
};

export default Topbar;
