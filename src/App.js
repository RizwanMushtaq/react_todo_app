import React, { Component } from 'react'
import './App.css';
import './components/styleTodoList.css'

import TodoTitle from './components/TodoTitle'
import TodoInput from './components/TodoInput'

class App extends Component {
  
  constructor(props) {
    super(props)
  
    this.state = {
      count: 1,
      todoArray: []
    }
  }

  addTodo = (inputFieldText) =>{
    console.log("addToDO function")
    console.log(inputFieldText)

    this.setState(state => {
      const todoArray = state.todoArray.concat(
        {id: state.count,
        title: inputFieldText,
        done: false}
      )
      const count = state.count + 1

      return {
        todoArray,
        count
      }
    })

    console.log(this.state.count);
  }
  
  render() {
    return (
      <div className="App">

        <TodoTitle />
        
        <TodoInput addTodoHandler = {this.addTodo}></TodoInput>

        <ul className='todoUL'>
          {this.state.todoArray.map(item => (
            <li key={item.id}> 
              {item.title}
              <div>
                <button>Done</button>
                <button>Delete</button>
              </div> 
            </li>
          ))}
        </ul>

     </div>
    )
  }
}

export default App
