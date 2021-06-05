import React, { useState, useEffect } from 'react'
import TodoList from './TodoList'
import db from '../firebase'
import firebase from 'firebase'
import { Input, InputLabel, FormControl, Button } from '@material-ui/core'
import { v4 as uuidv4 } from 'uuid';

function InputArea(props) {
    const [input, setInput] = useState('')
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        let isMounted = true;
        if (isMounted) {
            fetchDocsAndData()
        }
        isMounted = false;
    }, []);

    const fetchDocsAndData = async () => {
        console.log('inside fetch')
        if(props.user.uid===firebase.auth().currentUser.uid){
              console.log('inside if check')
        db.collection('todos').doc(props.user.uid).get()       
        .then((doc)=>{
            if(!doc.exists){
                console.log('Creating new document')
                db.collection('todos').doc(props.user.uid).set({username : props.user.userName,userId: props.user.uid, userTodos: []})
                .then(()=>{
                    getOnSnapshot(doc)
                })
            }
            if (doc.exists && doc.id === props.user.uid) {  
                console.log('exisitng use')            
                getOnSnapshot(doc)
            }    
          })
         .catch(() => {
            console.log('Error getting document')
            })
        }  
                        
    }

    const getOnSnapshot=(doc)=>{
        db.collection('todos').onSnapshot(snapshot => {                 
            snapshot.docs.forEach(snapshotDoc => {   
                if(snapshotDoc.id===doc.id)   {
                    const {userTodos, userID} = snapshotDoc.data()    
                    console.log('userTodos',userTodos)                     
                    setTodos(userTodos.reverse())
                }                                                                                 
            });
        })
    }

    console.log('state', todos)

    const addTodo = async (e) => {
        e.preventDefault()
        await db.collection('todos').doc(props.user.uid).update({
            userTodos: firebase.firestore.FieldValue.arrayUnion(
                { todo: input, todoId: uuidv4(), timestamp: firebase.firestore.Timestamp.now() }
            )
        }, { merge: true })
        setInput('')

    }
    return (
        <div>
            <br />
            <form onSubmit={addTodo}>
                <FormControl>
                    <InputLabel style={
                        { color: 'azure' }
                    }>
                        Write a To do</InputLabel>
                    <Input value={input}
                        onChange={
                            (e) => setInput(e.target.value)
                        }
                        size="large"
                        style={
                            { color: "whitesmoke" }
                        } />
                    <br />
                    <Button disabled={
                        !input
                    }
                        type="submit"
                        variant="contained"
                        style={
                            { color: 'whitesmoke' }
                        }>
                        Add
                    </Button>
                </FormControl>
            </form>

            {
            }
            {
                (todos.length > 0) ? todos.map(todo => {
                    return (

                        <TodoList todoObj={todo} user = {props.user} />
                    )
                }) : null
            } </div>
    )
}

export default InputArea
