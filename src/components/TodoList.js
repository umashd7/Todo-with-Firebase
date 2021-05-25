import React, { useState } from 'react'
import {
    List,
    ListItemText,
    ListItem,
    Checkbox,
    Grid
} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete';
import db from '../firebase'
import EditIcon from '@material-ui/icons/Edit';
import DialogUpdate from './Dialog';
import TrendingFlatIcon from '@material-ui/icons/TrendingFlat';
import firebase from 'firebase'


function TodoList(props) {
    
    const [open, setOpen] = React.useState(false);
    const [checked,setChecked] = React.useState(false)
   
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);       
    };

    const checkBoxClicked = (e)=>{      
       if(checked === false){   
            alert("Wanna close the task ?")    
            setChecked(!checked)                 
        }
        if(checked === true){        
            alert("Wanna re-open the task ?")    
            setChecked(!checked)                
            }            
        }
    

    const deleteTodo = (e) => {
        db.collection('todos').doc(props.todoObj.id).delete()
    }

    return (
        <div>
            <DialogUpdate open = {open} handleOpen = {handleOpen} handleClose = {handleClose} todoObj = {props.todoObj}   />
                <List style={{marginTop: '1.5rem'}} >
                <Grid container lg ='4'  alignContent ="stretch" spacing={0} justifyContent = "space-evenly" >
                    <ListItem divider={true} disabled = {checked} style = {{color : 'aqua'}}>
                        <TrendingFlatIcon/>
                         <ListItemText primary={ props.todoObj.todo } style = {{ marginLeft: '10px' }} />
                        
                        <Checkbox style={{
                             padding:'5px',
                             marginLeft:'15px',
                             marginRight:'0px',
                             alignContent: 'center',
                             color:'#64b5f6'
                         }} checked = {checked} onClick = {checkBoxClicked}> 
                         </Checkbox>
                        <EditIcon onClick={handleOpen}
                            style={{
                            cursor:'pointer',
                            padding:'5px',
                            marginLeft:'15px',
                            marginRight:'0px',
                            alignContent: 'center'
                        }}  />
                       
                         <DeleteIcon onClick={deleteTodo} style={{
                             cursor: 'pointer',
                             padding:'5px',
                             marginLeft:'15px',
                             marginRight:'0px',
                             alignContent: 'center',
                             color :'#ff5252'
                         }} />
                        
                    </ListItem>
                   
                    </Grid>
                    
                </List>
        
        </div>
    )
}

export default TodoList