import React from 'react'
import firebase from '../utils/firebase'

function Todo({todo}) {

    const deleteTodo = () => {

        const todoRef = firebase.database().ref('Todo').child(todo.id);
        todoRef.remove();
    }

    const completeTodo = () => {
        const todoRef = firebase.database().ref('Todo').child(todo.id);
        todoRef.update({
            complete: !todo.complete
        })
    }
    return (
        <div>
            <h1 className={todo.complete ? 'complete' : ''}>{todo.title}</h1>
            <button className="delete-btn" onclick={deleteTodo}>Delete</button>
            <button className="complete-btn" onclick={completeTodo}>Complete</button>
        </div>
    )
}

export default Todo
