// import React, { Component } from 'react'
// import firebase from 'firebase'
// import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
// import InputArea from './InputArea';
// import {  Button } from '@material-ui/core'
//  class AuthorizeUser extends Component {
//     constructor(){
//         state = {
//             isSignedIn : false
//         }
//     }
//  uiConfig = {
//     callbacks: {
//     signInSuccessWithAuthResult: ()=> false
//     },
//     signInFlow: 'popup',        
//     signInOptions: [
//         firebase.auth.GoogleAuthProvider.PROVIDER_ID,
//         firebase.auth.GithubAuthProvider.PROVIDER_ID,
//     ]
// }
// componentDidMount(){
//     firebase.auth().onAuthStateChanged(user=>{
//         this.setState({
//             isSigenedIn  : !!isSigenedIn 
//         })
//         console.log('user',user)
//     }) 
// }

//     render() {
//         return (
//             <div>
//                 {this.state.isSignedIn ? <> {console.log('signedIN',this.state.isSignedIn)}<Button onClick = {()=>firebase.auth().signOut()} /> <p> Singed in </p> </>: 
//         <StyledFirebaseAuth uiConfig = {uiConfig} firebaseAuth = {firebase.auth()}/>}
//             </div>
//         )
//     }
// }

// export default AuthorizeUser
