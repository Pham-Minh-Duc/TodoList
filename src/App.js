import TodoList from "./components/todolist/TodoList";
import Title from "./components/title/Title";
import { useState } from "react";
import { v4 } from 'uuid'
import './app.css'


function App() {
  const [todoList, setTodoList] = useState([])  //array
  const [textInput, setTextInput] = useState("")  //array

  const onTextInputChange = (e) => {
      setTextInput(e.target.value)    //lấy giá trị người dùng nhập vào
  }

  const onAddButtonClick = (e) => {
      //thêm text input vào danh sách todolist
      setTodoList([...todoList, {id: v4(), name: textInput, isCompleted: false}])
  }

  return (
    <>
    <Title />
    <input type='text' placeholder='thêm việc cần làm' onChange={onTextInputChange}/> 
    <button id='buttonTitle' onClick={onAddButtonClick}>Thêm</button>
    <TodoList todoList={todoList}/>
    </>
  )
}

export default App;
