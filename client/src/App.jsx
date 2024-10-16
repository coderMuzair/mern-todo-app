import { useState, useEffect } from 'react'
import './App.css'
import Textbox from '../components/textbox'
import Btn from '../components/button'
import { Edit, Delete, Home } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import Login from '../pages/Login';  // Import Login component
import SignUp from '../pages/SignUp';
import Button from '@mui/material/Button';
import { Route, Routes, Navigate } from 'react-router-dom';
import HomePage from '../pages/home';

// import { useState, useEffect } from 'react';
// import Icon from '@mui/material/Icon';
// import DeleteIcon from '@mui/icons-material/Delete';
// import EditRoundedIcon from '@mui/icons-material/EditRounded';

function App() {
 

//     const [isLogin, setIsLogin] = useState(true); // Toggle between login and sign-up
  
//     const toggleForm = () => {
//       setIsLogin(!isLogin);
//     };
  
   

// const [text, setText] = useState("");
// const [todos, setTodos] = useState([]);
// const [updateBtn, setUpdateBtn] = useState(false)
// const [currentIndex, setCurrentIndex] = useState("");
// const [error, setError] = useState(false);


// const handleTextChange = (e) =>{
//   setText(e.target.value);
//   setError(false)
// }
// const handleAddButton = () =>{
//   if(text.trim() == ""){
//     setError(true);
//     return;
//   }
//   const  date = () => new Date().toLocaleString();
//   const timestamp = date();

//   if(!updateBtn){
//     setTodos([...todos, {text, timestamp}]);
//   }else if(updateBtn){
//     const editTodo = [...todos];
//     editTodo[currentIndex] = {text, timestamp};
//     setTodos(editTodo);
//     setUpdateBtn(false);
//   }
//   setText("")

  
// }
// const handleEdit = (i) =>{
//   const editText = todos[i].text;
//   console.log('editText: ', i);
//   setText(editText);
//   setCurrentIndex(i)
//   setUpdateBtn(true);
// }

// const handleDelete = (i) =>{
//   const updatedTodos = [...todos];
//   updatedTodos.splice(i, 1)
//   setTodos(updatedTodos);
// }

  return (
    <>
    <Routes>
      <Route path='/' element={<Navigate to="/login"/>} />
      <Route path='/home' element={<HomePage/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<SignUp/>}/>
    </Routes>

 {/* <div style={{ textAlign: 'center', padding: '50px' }}>
        <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
        {isLogin ? <Login /> : <SignUp />}
        <Button onClick={toggleForm} variant="outlined" style={{ marginTop: '20px' }}>
          {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Login'}
        </Button>
      </div>

    <div className='main'>
        <h1>TODO APP</h1>
      <div className='inner-div'>
       <Textbox value={text} onChange={handleTextChange} error={error} label={updateBtn ? "Update Todo" : "Add Todo"}/><Btn onClick={handleAddButton} value={updateBtn ? "update" : "add"}/>
      </div>
      <div className='todo-div'>
      <ul>
        {todos.map((v,i)=>(
          <li id={i}><div className='todo-text'> {v.text}</div>
          <span><div className='todo-time'>{v.timestamp}</div></span>
          <div className='todo-icons'><IconButton aria-label="edit"><Edit onClick={()=>handleEdit(i)}/></IconButton> 
          <IconButton aria-label="delete"><Delete onClick={()=>handleDelete(i)}/></IconButton> </div>
          </li>
        ))}
      </ul>
      </div>

    </div> */}
      
    </>
  )
}

export default App
