import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { handleSuccess, handleError } from "../src/utils.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import "../src/loginSignup.css"

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async () => {

    if (name.trim() == "" || email.trim() == "" || password.trim() == "") {
      return handleError("All fields are required to be filled");
    }
    try {
      const url = "https://mern-todo-app-api-sigma.vercel.app/auth/signup";
      const response = await axios.post(url, { name, email, password });
      if (response.data.success == true) {
        toast.success("Signup Successfully. you can login now!", {
          onClose: () => navigate("/login"),
          autoClose: 2500,
        });
      }
    } catch (error) {
      if (error.response) {
        handleError(error.response.data.message);
      } else if (error.request) {
        console.error("No response recieved ", error.request);
      } else {
        console.error("error: ", error.message);
      }
    }
  };
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/login");
  };

  return (
    // <div style={{ background: "black" }}>
    <div style={{ textAlign: "center", padding: "50px",  }}>
      <h1>Sign Up</h1>
      <div style={{ maxWidth: "300px", margin: "0 auto" }}>
        <TextField
          fullWidth
          label="Name"
          variant="outlined"
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
          onClick={handleSignUp}
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginTop: "20px" }}
        >
          Sign Up
        </Button>
      </div>
      <Button
        onClick={handleClick}
        variant="outlined"
        style={{ marginTop: "20px" }}
      >
        Already have an account? Login
      </Button>
      <ToastContainer />
    </div>
    // </div>
  );
};

export default SignUp;
