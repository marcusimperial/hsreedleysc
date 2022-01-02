import '../firebase.js';
import { userLogIn, userLogOut } from '../requests.js';
import { useEffect } from 'react'
import {signInWithRedirect, signOut, GoogleAuthProvider, getAuth, getRedirectResult } from "firebase/auth";

export default function NewGoogleButton({ setLoader }){
    const authObj = getAuth();
    const signOutUser = async () => {
        await signOut(authObj);
        await userLogOut();
    }
    const flow = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const a = await signInWithRedirect(authObj, provider);
        } catch (e) {
            alert(e);
        }
    }

    useEffect(() => {
        const renderResult = async () => {
            const result = await getRedirectResult(authObj);
            console.log(result.user.accessToken);
            if (result) userLogIn(result.user.accessToken);
        }
        renderResult();

    })
    




    return (
        <div>
            <button onClick={flow}>Sign In</button>
            <button onClick={signOutUser}>Sign Out</button>
        </div>

    )
}

