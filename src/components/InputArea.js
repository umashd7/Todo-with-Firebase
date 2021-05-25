import React, { useState, useEffect } from 'react'
import TodoList from './TodoList'
import db from '../firebase'
import firebase from 'firebase'
import { Input, InputLabel, FormControl, Button } from '@material-ui/core'

function InputArea() {
    const [input, setInput] = useState('')
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        db.collection('todos').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
         //   console.log('db', snapshot.docs.map(doc => doc.data()))
            setTodos(snapshot.docs.map(doc =>({ todo :doc.data().todo, id: doc.id})
            ))
        })                                     

    }, [])

    const addTodo = (e) => {
        e.preventDefault()
        db.collection('todos').add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            todo: input
        })
        // setTodos([...todos,input])
        setInput('')
    }
    console.log('input',todos)
    return (
        <div>
            <br/>
           <form onSubmit = {addTodo}>
               <FormControl>
                <InputLabel style={{ color:'azure'}}> Write a To do</InputLabel>
                <Input value={input} onChange={(e) => setInput(e.target.value)} size="large"  style={{color:"whitesmoke"}}/>
                <br />
                <Button disabled={!input} type="submit" variant="contained" style={{ color : 'whitesmoke'}}> Add </Button>
            </FormControl>
           </form>
            {todos.map(todo => {
                return (
                    <TodoList todoObj={todo} />
                )
            })}
        </div>
    )
}

export default InputArea
