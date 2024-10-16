import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { handleError } from "../src/utils";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    console.log("Login with:", { email, password });
    if (email.trim() == "" || password.trim() == "") {
      return handleError("Email & Password must be filled");
    }
    try {
      const url = "http://localhost:8080/auth/login";
      const response = await axios.post(url, { email, password });
      console.log("response: ", response);
      if (response.data.success == true) {
        navigate("/home");
        let { userName, email, jwtToken } = response.data;

        localStorage.setItem("jwtToken", jwtToken);
        localStorage.setItem("loggedInUser", userName);
      }
    } catch (error) {
      handleError("Email or Password is wrong");
      console.log("error: ", error);
    }
  };

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/signup");
  };

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>Login</h1>
      <div style={{ maxWidth: "300px", margin: "0 auto" }}>
        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          fullWidth
          label="Password"
          variant="outlined"
          type="password"
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          onClick={handleLogin}
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginTop: "20px" }}
        >
          Login
        </Button>
      </div>
      <Button
        onClick={handleClick}
        variant="outlined"
        style={{ marginTop: "20px" }}
      >
        Don't have an account? Sign Up
      </Button>
      <ToastContainer />
    </div>
  );
};

export default Login;
