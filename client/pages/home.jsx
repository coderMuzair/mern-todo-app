import { useState, useEffect } from "react";
import "../src/App.css";
import Textbox from "../components/textbox";
import Btn from "../components/button";
import { Edit, Delete, AbcSharp } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { handleError } from "../src/utils";
import { toast, ToastContainer } from "react-toastify";
import LogoutIcon from "@mui/icons-material/Logout";
import { format } from "date-fns";


function HomePage() {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState([]);
  const [updateBtn, setUpdateBtn] = useState(false);
  const [currentTodoId, setCurrentTodoId] = useState("");
  const [error, setError] = useState(false);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  const isAuthenticated = () => {
    return localStorage.getItem("jwtToken") !== null; 
  };

  const url = "https://mern-todo-app-api-sigma.vercel.app/auth";
  const fetchTodos = async () => {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      console.error("No JWT token is found, user is not authenticated");
      return;
    }

    try {
      const response = await axios.get(`${url}/home`, {
        headers: {
          Authorization: token, // Attach token in Authorization header
        },
      });

      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching todos: ", error);
    }
  };

  useEffect(() => {
    if (isAuthenticated()) {
      fetchTodos();
      const currentUserName = localStorage.getItem("loggedInUser");
      setUserName(currentUserName);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleTextChange = (e) => {
    setText(e.target.value);
    setError(false);
  };

  const handleAddButton = async () => {
    if (!updateBtn) {
      addTodo();
    } else {
      updateTodo();
    }
  };

  const addTodo = async () => {
    if (text.trim() == "") {
      setError(true);
      handleError("Please type something");
      return;
    }

    const token = localStorage.getItem("jwtToken");
    if (!token) {
      console.error("No JWT token found, cannot add todo");
      return;
    }
    try {
      const response = await axios.post(
        `${url}/addTodo`,
        { text },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log("response: ", response);
      fetchTodos();
      setText("");
    } catch (error) {
      console.log("error: ", error);
    }
  };
  const updateTodo = async () => {
    if (text.trim() == "") {
      setError(true);
      handleError("Please type something");
      return;
    }
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      console.error("No JWT token found, cannot update todo");
      return;
    }
    try {
      const response = await axios.put(
        `${url}/updateTodo/${currentTodoId}`,
        { text },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log("response: ", response);
      fetchTodos();
      setText("");
      setUpdateBtn(false);
    } catch (error) {
      console.log("error: ", error);
    }
  };
  const handleEdit = async (id) => {
    console.log("id: ", id);

    const todoToUpdate = todos.find((v) => v._id == id);
    console.log("todoToUpdate: ", todoToUpdate);
    if (!todoToUpdate) {
      return console.log("failed to update, todo not found");
    }
    let todoToUpdateText = todoToUpdate.text;
    setText(todoToUpdateText);
    setCurrentTodoId(id);
    setUpdateBtn(true);
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("jwtToken");
    console.log("token: ", token);
    if (!token) {
      console.error("No JWT token found, cannot delete todo");
      return;
    }
    try {
      const response = await axios.delete(`${url}/deleteTodo/${id}`, {
        headers: {
          Authorization: token,
        },
      });
      console.log("response: ", response);
      const todoTodelete = todos.findIndex((v) => v._id == id);
      console.log("todoTodelete: ", todoTodelete);
      const updatedTodos = [...todos];
      updatedTodos.splice(todoTodelete, 1);
      setTodos(updatedTodos);
      fetchTodos();
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <LogoutIcon onClick={handleLogout} fontSize="large" />
      </div>
      <div className="main">
        <p>{`${userName.toUpperCase()}'s TODOs`}</p>
        <div className="inner-div">
          <Textbox
            value={text}
            onChange={handleTextChange}
            error={error}
            label={updateBtn ? "Update Todo" : "Add Todo"}
          />
          <Btn onClick={handleAddButton} value={updateBtn ? "update" : "add"} />
        </div>
        <div className="todo-div">
          <ul>
            {todos.map((v, i) => (
              <li key={v._id} id={v._id}>
                <div className="todo-text"> {v.text}</div>
                <span>
                  <div className="todo-time">
                    {format(new Date(v.createdAt), "MMM do, yyyy H:mm")}
                  </div>
                </span>
                <div className="todo-icons">
                  <IconButton
                    aria-label="edit"
                    onClick={() => handleEdit(v._id)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    onClick={() => handleDelete(v._id)}
                  >
                    <Delete />
                  </IconButton>{" "}
                </div>
              </li>
            ))}
          </ul>
        </div>
        <ToastContainer />
      </div>
    </>
  );
}

export default HomePage;
