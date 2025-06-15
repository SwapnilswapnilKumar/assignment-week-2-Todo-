import React, { useState, useEffect } from 'react';
import Navbar from "./components/Navbar";
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setShowFinished] = useState(true);
  const [sortBy, setSortBy] = useState("default"); 
  const [filter, setFilter] = useState("all");     

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString !== null) {
      setTodos(JSON.parse(todoString));
    }
  }, []);

  const saveToLS = (todosToSave) => {
    localStorage.setItem("todos", JSON.stringify(todosToSave));
  };

  const handleAdd = () => {
    if (todo.trim().length < 1) return;
    const newTodos = [...todos, { id: uuidv4(), todo: todo.trim(), isCompleted: false }];
    setTodos(newTodos);
    setTodo("");
    saveToLS(newTodos);
  };

  const handleEdit = (e, id) => {
    let t = todos.filter((item) => item.id === id);
    setTodo(t[0].todo);
    let newTodos = todos.filter((item) => item.id !== id);
    setTodos(newTodos);
    saveToLS(newTodos);
  };

  const handleDelete = (e, id) => {
    let newTodos = todos.filter((item) => item.id !== id);
    setTodos(newTodos);
    saveToLS(newTodos);
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleChangeCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => item.id === id);
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLS(newTodos);
  };

  const toggleFinished = () => {
    setShowFinished(!showFinished);
  };

  
  let sortedTodos = [...todos];
  if (sortBy === "az") sortedTodos.sort((a, b) => a.todo.localeCompare(b.todo));
  else if (sortBy === "za") sortedTodos.sort((a, b) => b.todo.localeCompare(a.todo));
  else if (sortBy === "completed") sortedTodos.sort((a, b) => a.isCompleted - b.isCompleted);

  let displayedTodos = sortedTodos.filter(item => {
    if (filter === "completed") return item.isCompleted;
    if (filter === "active") return !item.isCompleted;
    return true; 
  });

  return (
    <div className="App">
      <Navbar />
      <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh] md:w-1/2">
        <h1 className="font-bold text-center text-2xl md:text-3xl">Manage your todos at one place</h1>

        
        <div className="addTodo my-10 flex flex-col gap-4">
          <h2 className="text-2xl font-bold">Add a Todo</h2>
          <div className="flex">
            <input
              type="text"
              onChange={handleChange}
              value={todo}
              placeholder="Write Todo here..."
              className="w-full rounded-full px-5 py-1 outline-none"
            />
            <button
              disabled={todo.trim().length < 1}
              onClick={handleAdd}
              className="bg-violet-800 hover:bg-violet-950 p-4 py-2 font-bold text-white rounded-full mx-2"
            >
              Save
            </button>
          </div>
        </div>

        
        <div className="flex flex-col md:flex-row justify-between items-center gap-3">
          <div className="flex items-center gap-2">
            <input id="show" onChange={toggleFinished} type="checkbox" checked={showFinished} />
            <label htmlFor="show">Show finished</label>
          </div>

          <div className="flex gap-2">
            <select onChange={(e) => setSortBy(e.target.value)} className="p-2 rounded-md">
              <option value="default">Sort by: Default</option>
              <option value="az">A → Z</option>
              <option value="za">Z → A</option>
              <option value="completed">Unfinished First</option>
            </select>

            <select onChange={(e) => setFilter(e.target.value)} className="p-2 rounded-md">
              <option value="all">Show: All</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        <div className="h-[1px] bg-black opacity-15 w-full mx-auto my-4"></div>

       
        <h2 className="text-2xl font-bold">Your Todos</h2>
        <div className="todos">
          {displayedTodos.length === 0 ? (
            <div className="m-5">
              <h2>No todos</h2>
            </div>
          ) : (
            displayedTodos.map((item) => {
              return (
                (showFinished || !item.isCompleted) && (
                  <div key={item.id} className="todo flex md:w-100 justify-between my-3">
                    <div className="flex gap-5">
                      <input
                        name={item.id}
                        onChange={handleChangeCheckbox}
                        type="checkbox"
                        checked={item.isCompleted}
                      />
                      <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
                    </div>
                    <div className="buttons flex h-full">
                      <button
                        onClick={(e) => handleEdit(e, item.id)}
                        className="bg-violet-800 hover:bg-violet-950 p-2 py-1 font-bold text-white rounded-md mx-1"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={(e) => handleDelete(e, item.id)}
                        className="bg-violet-800 hover:bg-violet-950 p-2 py-1 font-bold text-white rounded-md mx-1"
                      >
                        <MdDelete />
                      </button>
                    </div>
                  </div>
                )
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
