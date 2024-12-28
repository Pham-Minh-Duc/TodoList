import './Todo.css'
export default function Todo({todo}){
    return <div id="buttonTodo">
                <button id='buttonTime'>{todo.nameTime}</button>
                <button>
                    {todo.nameContent}
                    <i className="ti-check"></i>
                </button>
           </div>
}