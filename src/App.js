import { Component } from 'react';
import './App.css';
import TodoTitle from './components/TodoTitle'
import TodoInput from './components/TodoInput'
import TodoList from './components/TodoList'


class App extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      todoArray: []
    }
  }
  
  render() {
    return(
      <div className="App">
      <TodoTitle />
      <TodoInput />
      <TodoList />
      </div>
    )}
}

export default App;
