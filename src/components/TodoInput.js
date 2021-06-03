import React from 'react'
import './styleTodoInput.css' 

function TodoInput(props) {
    
    function updateAddButton(){
        console.log("updateAddButton function")
        if(document.querySelector('.inputField').value.trim() === '' ){
            document.querySelector('.addTodoButton').disabled = true;
            document.querySelector('.buttonSpan').style.pointerEvents = 'none';
        }else{
            document.querySelector('.addTodoButton').disabled = false;
            document.querySelector('.buttonSpan').style.pointerEvents = 'all';
        }
    }

    return (
        <div>
            <input type='text' 
            className='inputField'
            onChange= {updateAddButton}>
            </input>

            <span className='buttonSpan'
            onClick = {()=> props.addTodoHandler(document.querySelector('.inputField').value)}>

            <button
            className='addTodoButton' 
            disabled>
            Add</button>
            
            </span>

        </div>
    )
}

export default TodoInput

