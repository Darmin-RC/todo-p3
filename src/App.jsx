import { useEffect, useState } from "react"
import { TodoContextProvider } from "./contexts/TodoContext"
import Form from "./components/Form"
import Item from "./components/Item"
const App = () => {
  const [todos, setTodos] = useState([])

  const addTodo = (todo) => {
    setTodos((prev) => [{ ...todo }, ...prev])
  }
  const editTodo = (todo, id) => {
    setTodos((prev) => prev.map((prevTodo) => (
      prevTodo.id === id ? todo : prevTodo
    )))
  }
  const delTodo = (id) => {
    setTodos((prev) => prev.filter((prevTodo) => prevTodo.id != id))
  }
  const toggleComp = (id) => {
    setTodos((prev) => prev.map((prevTodo) => (
      prevTodo.id === id ? { ...prevTodo, completed: !prevTodo.completed } : prevTodo
    )))
  }
  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"))
    if (todos && todos.length > 0) {
      setTodos(todos)
    }
  }, [])
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])
  return (
    <TodoContextProvider value={{ todos, addTodo, editTodo, delTodo, toggleComp }}>
      <div className="flex justify-center items-center min-h-screen bg-gray-900 p-5">
        <div className="w-full max-w-2xl">
          <Form />
          <div className="w-full mt-5 flex flex-col justify-center items-center gap-y-2">
            {todos.map((todo)=>{
              return <Item key={todo.id} todo={todo} />
            })}
          </div>
        </div>
      </div>
    </TodoContextProvider>
  )
}

export default App
