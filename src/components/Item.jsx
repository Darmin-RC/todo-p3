import { useState, useEffect } from "react";
import { useTodo } from "../contexts/TodoContext";

const Item = ({ todo }) => {
  const [isEditable, setIsEditable] = useState(false);
  const [todoVal, setTodoVal] = useState(todo.title);

  const { delTodo, editTodo, toggleComp } = useTodo();

  useEffect(() => {
    setTodoVal(todo.title);
  }, [todo.title]);

  const deleteTodo = () => {
    delTodo(todo.id);
  };

  const toggle = () => {
    toggleComp(todo.id);
    setIsEditable(false);
  };

  const edit = () => {
    if (todoVal.trim() === "") return;
    editTodo({ ...todo, title: todoVal }, todo.id);
    setIsEditable(false);
  };

  return (
    <div
      data-testid="todo-item"
      data-completed={todo.completed ? "true" : "false"}
      className={`w-full p-3 rounded ${
        todo.completed ? "bg-green-300/20" : "bg-gray-800"
      } border border-gray-100/20 flex justify-between items-center`}
    >
      <div className="flex items-center justify-between w-full sm:w-auto gap-3">
        <input
          data-testid="toggle-btn"
          onChange={toggle}
          checked={todo.completed}
          type="checkbox"
          className="outline-none border-none accent-blue-200 hover:accent-blue-300 cursor-pointer"
        />
        <input
          data-testid="todo-text-input"
          className={`text-gray-200 font-semibold py-0.5 ${
            isEditable
              ? "rounded pl-2 outline outline-1 outline-gray-100/20"
              : "outline-none cursor-default"
          }`}
          readOnly={!isEditable}
          value={todoVal}
          onChange={(e) => setTodoVal(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && isEditable) edit();
            if (e.key === "Escape" && isEditable) {
              setTodoVal(todo.title);
              setIsEditable(false);
            }
          }}
        />
      </div>
      <div className="flex items-center justify-between w-full gap-3 sm:w-auto sm:justify-end">
        <button
          data-testid={isEditable ? "save-btn" : "edit-btn"}
          disabled={todo.completed}
          onClick={() => {
            if (isEditable) {
              edit();
            } else {
              setIsEditable(true);
            }
          }}
          className={`bg-green-300 text-gray-700 font-md px-2.5 py-1 sm:py-0.5 rounded transition ease-in-out duration-200 ${
            !todo.completed
              ? "cursor-pointer hover:outline hover:outline-gray-100/20 hover:bg-transparent hover:text-green-300 hover:font-semibold"
              : "cursor-not-allowed opacity-50"
          }`}
        >
          {isEditable ? "Save" : "Edit"}
        </button>
        <button
          data-testid="delete-btn"
          onClick={deleteTodo}
          className="bg-red-300 text-gray-700 font-md px-2.5 py-1 sm:py-0.5 rounded cursor-pointer hover:outline hover:outline-gray-100/20 hover:bg-gray-800 transition ease-in-out duration-200 hover:text-red-300 hover:font-semibold"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Item;
