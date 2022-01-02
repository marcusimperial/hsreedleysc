import '../firebase.js';
import { userLogIn, userLogOut } from '../requests.js';
import { useEffect } from 'react'
import { signInWithRedirect, signOut, GoogleAuthProvider, getAuth, onAuthStateChanged } from "firebase/auth";

export default function NewGoogleButton(){
    const authObj = getAuth();
    const signOutUser = async () => {
        await signOut(authObj);
        await userLogOut();
    }
    const flow = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const a = await signInWithRedirect(authObj, provider);
            alert(a.user);
        } catch (e) {
            alert(e);
        }
    }

    const authState = (user) => {
        if (user) userLogIn(user.accessToken);
        else alert('signed out');
    }

    onAuthStateChanged(authObj, authState)

    return (
        <div>
            <button onClick={flow}>Sign In</button>
            <button onClick={signOutUser}>Sign Out</button>
        </div>

    )
}

