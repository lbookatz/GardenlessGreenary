
import React, {useState, useEffect} from 'react'
import TodoForm from './TodoForm'
import Todo from './Todo';
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import "./Todo.css";

function TodoList(props) {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    getTodoList();
  }, []);

  const getTodoList = async () => {
    
    const response = await fetch("http://localhost:5000/user/gettodo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
          username: props.username
      }),
    });
    const data = await response.json();
    
    let tasks = []
    for (var i = 0; i < data.todo.length; i++) {
        data.todo[i].id=data.todo[i]._id
        tasks.push(data.todo[i]);
      }
    setTodos(tasks);
  };

  const addTodo = async (todo) => {
    
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }

    const response = await fetch("http://localhost:5000/user/addtodo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
          username: props.username,
          todo: todo.text
      }),
    });
    const data = await response.json();
    
    let tasks = []
    for (var i = 0; i < data.todo.length; i++) {
        data.todo[i].id=data.todo[i]._id
        tasks.push(data.todo[i]);
      }
    setTodos(tasks);
  };

  const updateTodo = (todoId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }

    setTodos((prev) => prev.map((item) => item.id === todoId));
  };

  const removeTodo = async (id) => {

    await fetch("http://localhost:5000/user/removetodo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
          username: props.username,
          id:id
      }),
    });

    getTodoList();
  };

  const completeTodo = (id) => {
    let updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };


    return (
        <div>
            <div className="todo-app">
                <HighlightOffIcon
                    className="close-icon"
                    onClick={() => props.setShowTask(false)}
                />

                <h1>Plant Planner</h1>

                <TodoForm onSubmit={addTodo} />

                <Todo 
                todos={todos} 
                completeTodo={completeTodo} 
                removeTodo={removeTodo} 
                updateTodo={updateTodo}
                />
                
            </div>
        </div>
    )

}

export default TodoList;
