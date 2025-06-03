import { useState } from 'react'
import './App.css'

type Todo = {
    id: number,
    text: string,
    isCompleted: boolean
  }

function App() {
  
  const [input, setInput] = useState("");
  const [list, setList] = useState<Todo[]>([]);

  const addTodo = () => {

    if (input.trim() === "" || list.find(t => t.text === input)) {
      alert("Enter a valid todo");
      setInput("")
      return;
    }
  
    const item: Todo = {
      id: list.length + 1,
      text: input.trim(),
      isCompleted: false
    }

    setList(prev => [...prev, item]);
    setInput("");
  }

  const toggleCompleted = (id :number) => {
    setList(
      list.map(t => {
        if (t.id === id) {
          return {
            ...t,
            isCompleted: !t.isCompleted
          }
        } else return t; 
      })
    )
  }

  const deleteTodo = (id: number) => {
    setList(
      list.filter(
        (t) => t.id !== id
      )
    )
  }

  return (<>
      <div>
      <input type="text" placeholder='Enter your Todos' value={input} onChange={(e) => setInput(e.target.value)} />
      <span style={{padding:20}}>
        <button onClick={() => addTodo()}>Add</button>
      </span>

      <ul>
        {list.map(l => 
          <li key={l.id}>
            <input type="checkbox" onChange={() =>toggleCompleted(l.id)}/>
            <span className={l.isCompleted ? 'strikeThrough' : ''}>{l.text}</span>
            <button style={{marginLeft: 20}} onClick={() => deleteTodo(l.id)}>Delete</button>
          </li>
        )}
      </ul>
      </div>
    </>
)
}

export default App
