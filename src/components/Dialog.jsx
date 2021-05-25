import { React, useState } from 'react'
import {
    Button,
    Dialog,
    DialogActions,
    DialogTitle,
    DialogContent,
    Input,
    InputLabel,    

} from '@material-ui/core'
import db from '../firebase'
function DialogUpdate(props) {
    console.log('todo',props.todoObj.todo)
    const [updatedTodo, setupdatedTodo] = useState("")

    const handleUpdate = (e) => {
     
            db.collection('todos').doc(props.todoObj.id).set({
            todo: updatedTodo
        }, { merge: true })
        
        props.handleClose();
    }
    const handleClose = ()=>{
        props.handleClose()     
        setupdatedTodo("")  
    }

   

    return (
        <Dialog open={props.open}
            onClose={props.handleClose}
            aria-labelledby="form-dialog-title"
            fullWidth="lg"
            onBackdropClick={props.handleClose}>
            <DialogTitle id="form-dialog-title">Update Your Todo</DialogTitle>
            <DialogContent>
                 <InputLabel >Feel like changing ? Go ahead</InputLabel>
            <Input placeholder= {props.todoObj.todo} autoFocus margin="dense" id="name" label="Update Todo" fullWidth
                value={updatedTodo}
                onChange={
                    (e) => setupdatedTodo(e.target.value)
                } />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleUpdate}
                    color="primary" disabled = {!updatedTodo} >
                    Go Ahead!
        </Button>
                <Button onClick={handleClose}
                    color="primary">
                    Go Back
        </Button>
            </DialogActions>
        </Dialog>
    )

}

export default DialogUpdate
