import React, { useState } from 'react';
import 'animate.css';
import data from "./db.json";
// import { Draggable } from 'react-drag-reorder';

import './App.css';
 


function App() {
  
  const [ toDoList, setToDoList ] = useState(data);

  const handleToggle = (id) => {
    let mapped = toDoList.map(task => {
      return task.id === Number(id) ? { ...task, complete: !task.complete } : { ...task};
    });
    setToDoList(mapped);
  }

  const handleFilter = () => {
    let filtered = toDoList.filter(task => {
      return !task.complete;
    });
    setToDoList(filtered);
  }

  const addTask = (userInput ) => {
    let copy = [...toDoList];
    copy = [...copy, { id: toDoList.length + 1, task: userInput, complete: false }];
    setToDoList(copy);
  }

  const Header = () => {
    return (
        <header>
            <h1>To Do List</h1>
        </header>
    );
};

const ToDo = ({todo, handleToggle}) => {

  const handleClick = (e) => {
      e.preventDefault()
      handleToggle(e.currentTarget.id)
  }

  return (
      <div id={todo.id} key={todo.id + todo.task} name="todo" value={todo.id} onClick={handleClick} className={todo.complete ? "todo strike" : "todo"}>
          {todo.task}
      </div>
  );
};

const ToDoForm = ({ addTask }) => {

  const [ userInput, setUserInput ] = useState('');

  const handleChange = (e) => {
      setUserInput(e.currentTarget.value)
  }

  const handleSubmit = (e) => {
      e.preventDefault();
      addTask(userInput);
      setUserInput("");
      
      
      console.log(`
      {
        id: ${Number()}
        task: ${userInput}
      }
      `);
  
      fetch('http://localhost:3000/data', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: "",
          task: userInput
        })
      })
    }


  return (
      <form onSubmit={handleSubmit}>
          <input value={userInput} type="text" onChange={handleChange} placeholder="Enter task..."/>
          <button>Submit</button>
      </form>
  );
};

const ToDoList = ({toDoList, handleToggle, handleFilter}) => {
  return (
      <div>
          {toDoList.map(todo => {
              return (
                  <ToDo todo={todo} handleToggle={handleToggle} handleFilter={handleFilter}/>
              )
          })}
          <button style={{margin: '20px'}} onClick={handleFilter}>Clear Completed</button>
      </div>
  );
};

  return (
    <div className="App">
      <Header />
      <ToDoList toDoList={toDoList} handleToggle={handleToggle} handleFilter={handleFilter}/>
      <ToDoForm addTask={addTask}/>
    </div>
  );

  return (
    <div>
      <button style={{margin: '20px'}} onClick={handleFilter}>Clear All</button>
    </div>
  );


}
 
export default App;