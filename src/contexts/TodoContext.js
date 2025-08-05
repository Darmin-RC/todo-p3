import { createContext, useContext } from "react";

export const TodoContext = createContext({
    todos:[
        {
            id:1,
            title: "Azaan's Todo",
            completed: false
        }
    ],
    addTodo: (todo)=>{},
    editTodo: (todo,id)=>{},
    delTodo: (id)=>{},
    toggleComp: (id)=>{}
})

export const TodoContextProvider = TodoContext.Provider

export const useTodo = () => {
    return useContext(TodoContext)
}