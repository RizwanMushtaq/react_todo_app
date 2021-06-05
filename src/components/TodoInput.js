import React from 'react'
import './styleTodoInput.css' 

function TodoInput(props) {

    function updateInputField(){
        if(document.querySelector('.inputField').value.trim() === '' ){
            //do nothing
        }else{
            document.querySelector(".inputField").style.border = "none"
        }
    }

    return (
        <div>
            <form onSubmit= {props.addTodoHandler}>
                <input type='text' 
                className='inputField'
                onInput= {updateInputField}>
                </input>

                <button
                className='addTodoButton' 
                type= 'submit'>
                Add</button>
            </form>
        </div>
    )
}

export default TodoInput

