import '../firebase.js';
import { userLogIn, userLogOut } from '../requests.js';
import { useEffect } from 'react'
import { signInWithRedirect, signOut, GoogleAuthProvider, getAuth, getRedirectResult } from "firebase/auth";

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
            alert(a.user);
        } catch (e) {
            alert(e);
        }
    }

    useEffect(() => {
        const renderResult = async () => {
            
            const result = await getRedirectResult(authObj);
            if (result) {
                setLoader(true);
                const login = await userLogIn(result.user.accessToken);
                if (login) window.location.replace('/');
            }
            setLoader(false);
        }
        renderResult();
    })


    return (
        <>
        <header className="container">
          <section id="sec" className="container">
            <h1 id="mainlbl">The<br/>SC Website</h1>
            <button className="googlebutton" onClick={flow}>Sign In</button>
          </section>
        </header>
      </>
    )
}

