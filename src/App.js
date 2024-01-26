import React, { useState } from 'react';
import './App.css';

function App() {
  const [toDos, setTodos] = useState([]);
  const [toDo, setTodo] = useState('');
  const [editMode, setEditMode] = useState(null);

  const addTodo = () => {
    if (toDo.trim() !== '') {
      // Check if in edit mode
      if (editMode !== null) {
        // Update existing ToDo
        const updatedTodos = toDos.map((todo) =>
          todo.id === editMode ? { ...todo, text: toDo } : todo
        );
        setTodos(updatedTodos);
        setEditMode(null);
      } else {
        // Check if the ToDo already exists
        const isDuplicate = toDos.some((todo) => todo.text === toDo);

        if (!isDuplicate) {
          // Add new ToDo
          setTodos([...toDos, { id: Date.now(), text: toDo, status: false }]);
          setTodo('');
        } else {
          alert('This ToDo already exists!');
        }
      }
    }
  };

  const deleteTodo = (id) => {
    setTodos(toDos.filter((todo) => todo.id !== id));
  };

  const toggleStatus = (id) => {
    setTodos(
      toDos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, status: !todo.status };
        }
        return todo;
      })
    );
  };

  const startEdit = (id) => {
    const todoToEdit = toDos.find((todo) => todo.id === id);
    setTodo(todoToEdit.text);
    setEditMode(id);
  };

  return (
    <div className="app">
      <div className="mainHeading">
        <h1>ToDo List</h1>
      </div>
      <div className="subHeading">
        <br />
        <h2>Whoop, it's Wednesday 🌝 ☕ </h2>
      </div>
      <div className="input">
        <input
          value={toDo}
          onChange={(e) => setTodo(e.target.value)}
          type="text"
          placeholder="🖊️ Add item..."
        />
        <i onClick={addTodo} className="fas fa-plus"></i>
      </div>
      <div className="todos">
        {toDos.map((obj) => (
          <div className={`todo ${obj.status ? 'completed' : ''}`} key={obj.id}>
            <div className="left">
              <input
                onChange={() => toggleStatus(obj.id)}
                checked={obj.status}
                type="checkbox"
              />
              {editMode === obj.id ? (
                <input
                  type="text"
                  value={toDo}
                  onChange={(e) => setTodo(e.target.value)}
                />
              ) : (
                <p className={obj.status ? 'completed' : ''}>{obj.text}</p>
              )}
            </div>
            <div className="right">
              {editMode === obj.id ? (
                <i onClick={addTodo} className="fas fa-check"></i>
              ) : (
                <>
                  <i onClick={() => startEdit(obj.id)} className="fas fa-pen"></i>
                  <i onClick={() => deleteTodo(obj.id)} className="fas fa-times"></i>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
