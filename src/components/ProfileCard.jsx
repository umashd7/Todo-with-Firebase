import { Button,Dialog,DialogActions,DialogContent,DialogTitle,FormLabel } from '@material-ui/core'
import React from 'react'

function ProfileCard(props) {
    return (
       
            <Dialog  aria-labelledby="form-dialog-title"
            open = {props.isOpen}
            fullWidth="lg"
            onClose = {props.handleProfileClose}
           >
               {/* <DialogTitle id="form-dialog-title">Your Profile</DialogTitle> */}
               <DialogContent>
                   <div className = "profile-grid">
                        <img style = {{ alignContent:'center' }} src={props.user.photoURL} alt="no image" className="large"  width="150" height="200" style = {{ borderRadius:"50%"}}/>
                       <div className = "profile-grid">
                            <FormLabel className = "user-details"> UserName:  </FormLabel>
                            <FormLabel className = "user-details">  {props.user.userName} </FormLabel>
                            <FormLabel className = "user-details"> Email:  </FormLabel>
                            <FormLabel className = "user-details"> {props.user.userEmail} </FormLabel>
                       </div>
                   </div>
                    
                   
               </DialogContent>
                <DialogActions>
                    <Button variant="contained" primary onClick = {props.handleProfileClose} 
                   >Close
                </Button>
                </DialogActions>
            </Dialog>
    )
}

export default ProfileCard
