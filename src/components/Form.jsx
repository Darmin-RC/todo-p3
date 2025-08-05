import { useState } from "react"
import { useTodo } from "../contexts/TodoContext"

const Form = () => {
    const [title, setTitle] = useState("")
    const { addTodo } = useTodo()
    const add = (e) => {
        e.preventDefault()
        if(!title) return
        addTodo({ id: Date.now(), title, completed: false })
        setTitle("")
    }
    return (
        <form onSubmit={add} className="flex justify-between border-1 rounded border-gray-100/20">
            <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Type you task here" type="text" className="text-sm text-gray-200 outline-none placeholder:text-gray-600 bg-gray-800 w-full rounded-s py-1.5 px-3" />
            <button type="submit" className="bg-blue-200 text-gray-700 text-sm min-w-15 px-2 py-1.5 rounded-r font-semibold cursor-pointer hover:bg-gray-700 hover:text-blue-200 transition duration-200 ease-in-out">Add</button>
        </form>
    )
}

export default Form
