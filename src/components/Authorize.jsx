import React, { useState, useEffect } from 'react'
import firebase from 'firebase'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import InputArea from './InputArea';
import { Button, MenuItem, Menu } from '@material-ui/core'

import Avatar from '@material-ui/core/Avatar';
import ProfileCard from './ProfileCard';

function Authorize() {
    const [user, setUser] = useState({ isSignedIn: false, userName: "Guest", userEmail: "", photoURL: "", uid: "" })
    const [openProfile, setProfileOpen] = useState(false)
    const [avatarImg, setAvatarImg] = useState('/static/images/avatar/1.jpg')
    const [anchorEl, setAnchorEl] = React.useState(null);

    var uiConfig = {
        callbacks: {
            signInSuccessWithAuthResult: () => false
        },
        signInFlow: 'popup',
        signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID, firebase.auth.GithubAuthProvider.PROVIDER_ID,]
    };

    useEffect(() => {
       
            const unsubs =   firebase.auth().onAuthStateChanged(user => {
                    console.log('user on change', user)

                    setUser({ isSignedIn: !!user, userName: user.displayName, userEmail: user.email, photoURL: user.photoURL, uid: user.uid })
                })
            
           return(()=>{
               unsubs()
           })

    }, [])


    const avatarClicked = (event) => {

        setAnchorEl(event.currentTarget);
    }

    const handleProfileDetails = () => {
        setAnchorEl(null);
        setProfileOpen(!openProfile)
    };
    const handleProfileClose = () => {

        setProfileOpen(!openProfile)
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleLogout = () => {
        setAnchorEl(null);
        firebase.auth().signOut()

        setUser({ isSignedIn: false, userName: 'Guest', userEmail: 'NA', photoURL: '', uid: '' })
    };


    return (
        <div>
            <header className="App-header">
                <p className="welcome">
                    {
                        `Welcome ${user.userName
                        }`
                    }</p>

                <Avatar isAvatarClicked
                    src={
                        user.photoURL
                    }
                    aria-haspopup="true"
                    className="avatar"
                    onClick={avatarClicked} /> {
                    setAnchorEl !== null ? <>
                        <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}
                            disabled={
                                !user.isSignedIn
                            }>
                            <MenuItem onClick={handleProfileDetails} disabled={!user.isSignedIn}>Profile</MenuItem>
                            <MenuItem onClick={handleLogout} disabled={!user.isSignedIn}>Logout</MenuItem>
                        </Menu>
                    </> : null
                } </header>
            <ProfileCard isOpen={openProfile}
                handleProfileClose={handleProfileClose}
                user={user} />

            <h1>TODO APP</h1>
            {
                user.isSignedIn ? <> {
                    console.log('inside Ath', user)
                }
                    <InputArea isSignedIn={user.isSignedIn} user={user} />
                </> : <StyledFirebaseAuth uiConfig={uiConfig}
                    firebaseAuth={
                        firebase.auth()
                    } />
            } </div>
    )
}

export default Authorize
