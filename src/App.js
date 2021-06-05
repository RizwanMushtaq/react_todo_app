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

  //Function to be called when adding item to the list*****************************************************************
  addTodo = (event) =>{
    console.log("addToDO function")
    let inputFieldText = document.querySelector('.inputField').value
    if(inputFieldText.trim() === ''){
      document.querySelector(".inputField").style.border = "solid red"
    }else{
      this.setState( 
        (state) => {
          let todoArray = state.todoArray.concat(
            {id: state.count,
            title: inputFieldText,
            done: false}
          )
          
          let count = state.count + 1
  
          return {
            todoArray, 
            count
          }
        },
        () => {
          console.log(this.state.count)
          console.log(this.state.todoArray)
          //Saving data in Local Storage
          this.saveDataInLocalStorage(this.state.todoArray)
        }
      )

      document.querySelector(".inputField").style.border = "none"
    }

    //Clear Input field after adding item to the list
    document.querySelector(".inputField").value = ''
    event.preventDefault()
    
  }

  //Function to be called when setting item to done state*****************************************************************
  updateToDoneTodo = (event)=> {
    // console.log(event)
    // console.log(event.target.parentElement.parentElement.id)
    event.target.parentElement.parentElement.firstChild.style.textDecoration = 'line-through'
    event.target.parentElement.parentElement.style.backgroundColor = '#d3d3d3'

    this.setState(
      (state) => {
        state.todoArray.forEach(element => {

          if(element.id === parseInt(event.target.parentElement.parentElement.id)){
            element.done = true
          }
        });
        return (state.todoArray)
      },
      () => {
        // console.log(this.state.count)
        console.log(this.state.todoArray)
        this.saveDataInLocalStorage(this.state.todoArray)
      }
    )

  }

  //function to be called when deleting item from the list*****************************************************************
  updateToDeleteTodo = (event)=> {
    this.setState(
      (state) => {
        state.todoArray.forEach(element=>{
          if(element.id === parseInt(event.target.parentElement.parentElement.id)){
            let index = state.todoArray.indexOf(element)
            if(index > -1){
              state.todoArray.splice(index,1)
            }
          }
        })
        return (state.todoArray)
      },
      () => {
        // console.log(this.state.count)
        console.log(this.state.todoArray)
        this.saveDataInLocalStorage(this.state.todoArray)
      }
    )
  }

  //Function to save data in Local storage*****************************************************************
  saveDataInLocalStorage = (arrayData)=> {
    localStorage.setItem("myTodoList", JSON.stringify(arrayData))
  }
  //Function to set item to done by reading dataarray (its called on window onload time)*****************************************************************
  updateDoneItemsinDOM = (arrayData)=> {
    let todoLI = document.querySelectorAll('.todoLI');
    // console.log(todoLI);
    // console.log(arrayData);
    if(arrayData){
      arrayData.forEach(element=>{
        if(element.done){
          todoLI.forEach(item=> {
            if(parseInt(item.id) === element.id){
              item.firstChild.style.textDecoration = 'line-through'
              item.style.backgroundColor = '#d3d3d3'
            }
          })
        }
      })
    }
    
  }
  //Function to load data from Local Storage*****************************************************************
  componentDidMount(){
    console.log('In component did mount function')
    let arrayData = JSON.parse(localStorage.getItem("myTodoList"))
    
    if(arrayData){
      this.setState(
        (state)=> {
          state.todoArray = arrayData
          let maxId = 1
          arrayData.forEach(item => {
            if(item.id>maxId){
              maxId = item.id
            } 
          })
          state.count = maxId+1
          return (state.todoArray, state.count)
        },
        () => {
          console.log(this.state.todoArray)
          console.log(this.state.count)
          this.updateDoneItemsinDOM(this.state.todoArray)
        }
      )
    }
  }
  //Function to render DOM*****************************************************************
  render() {
    return (
      
      <div className="App">
        
          <TodoTitle />
          
          <TodoInput addTodoHandler = {this.addTodo}></TodoInput>

          <ul className='todoUL'>
            {this.state.todoArray.map(item => (
              <li key={item.id} id={item.id} className='todoLI'> 
                <p>{item.title}</p>
                <div>
                  <button onClick={this.updateToDoneTodo}>Done</button>
                  <button onClick={this.updateToDeleteTodo}>Delete</button>
                </div> 
              </li>
            ))}
          </ul>

        
      </div>
     
    )
  }
}

export default App
