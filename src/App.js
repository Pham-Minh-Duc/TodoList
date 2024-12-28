import TodoList from "./components/todolist/TodoList";
import Title from "./components/title/Title";
import { forwardRef, useCallback, useEffect, useState } from "react";
import { v4 } from 'uuid'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { FaCalendarAlt } from "react-icons/fa"; 
import './App.css'

const TODO_APP_STORAGE_KEY = 'TODO_APP'

function App() {
  const [todoList, setTodoList] = useState([])  //array
  const [textInput, setTextInput] = useState("")  //array
  const [textTime, setTextTime] = useState("")
  const [selectedDate, setSelectedDate] = useState(null)

  useEffect(() => {
    const storagedTodoList = localStorage.getItem(TODO_APP_STORAGE_KEY)
    if (storagedTodoList) {
      setTodoList(JSON.parse(storagedTodoList))
    }
  }, [])  

  useEffect(() => {
    if(todoList.length > 0) {
      localStorage.setItem(TODO_APP_STORAGE_KEY, JSON.stringify(todoList))
    }
  }, [todoList])

  const onTextInputChange = useCallback((e) => {
      setTextInput(e.target.value)    //lấy giá trị người dùng nhập vào
  }, [])

  const onTextTimeChange = useCallback((e) => {
      setTextTime(e.target.value)
  },[])

  const onDateChange = useCallback((date) => {
    setSelectedDate(date)
    setTextTime(date?.toLocaleDateString("vi-VN") || "")
  },[])

  const onAddButtonClick = useCallback((e) => {
      //thêm text input vào danh sách todolist
      setTodoList(
        [
            {id: v4(),
             nameTime: textTime,
             nameContent: textInput,
             isCompleted: false
            },
            ...todoList
        ],
      )
      setTextInput("")
      setTextTime("")
  }, [todoList, textInput, textTime])

  const clearLocalStorage = () => {
    const isConFirmed = window.confirm("Xóa toàn bộ dữ liệu ?")
    if (isConFirmed) {
      localStorage.removeItem(TODO_APP_STORAGE_KEY)
      alert("Dữ liệu đã được xóa")
    }
    else{
      alert("Đã hủy xóa")
    }
  }


  const CustomDateInput = forwardRef(({ value, onClick }, ref) => (
    <div onClick={onClick} ref={ref} style={{position:"absolute",display:"flex", alignItems: "center", cursor: "pointer", top: -78, right: -260 }}>
      <FaCalendarAlt size={24}/>
    </div>
  )); 

  return (
    <>
      <Title />
      <div id="locate">
        <div id="input">
          <input type='text' placeholder='thời gian' onChange={onTextTimeChange} value={textTime}/>
          <input type='text' placeholder='thêm việc cần làm' onChange={onTextInputChange} value={textInput}/>
        </div>
        <DatePicker label="time" id="DatePicker" selected={selectedDate} onChange={onDateChange} dateFormat="dd/MM/yyyy" customInput={<CustomDateInput />}/>
        <button class='buttonTitle' onClick={onAddButtonClick} disabled={!textInput.trim() || (!textTime.trim() && !selectedDate)}>Thêm</button>
        <button class='buttonTitle buttonDelete' onClick={clearLocalStorage}>xóa dữ liệu</button>

      </div>
      <TodoList todoList={todoList}/>
    </>
  )
}

export default App;
