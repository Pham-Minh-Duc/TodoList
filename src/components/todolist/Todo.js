import react from 'react'
import './Todo.css'
export default function todo({todo}){
    return <button>{todo.name}</button>
}