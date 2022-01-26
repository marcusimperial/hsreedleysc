import { userLogIn } from '../requests.js';
import { useEffect } from 'react'
import { signInWithRedirect, GoogleAuthProvider, getAuth, getRedirectResult } from "firebase/auth";

export default function NewGoogleButton({ setLoader, loader }){
    const auth = getAuth();
    const flow = async () => {
        const provider = new GoogleAuthProvider();
        try {
           await signInWithRedirect(auth, provider);
        } catch (e) {
            alert(e);
        }
    }

    useEffect(() => {
        const renderResult = async () => {
            const result = await getRedirectResult(auth);
            if (!result) return;

            if (!result.user.email.includes('risfamily')) return alert('Error: Email is not an Risfamily Email.');
            setLoader(true);
            const login = await userLogIn(result.user.accessToken);
            if (login) window.location.replace('/');
            setLoader(false);
        }
        renderResult();
    })
    if (!loader)
    return (
        <>
          <section className="container">
              <div className="title">
                  <h1>THE</h1>
                  <h1>SC WEBSITE</h1>
              </div>
            <button onClick={flow} className="loginbutton">
                <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt=""/>
                <h1>Sign in with Google</h1>
            </button>
          </section>
      </>
    )
    else return (<></>);
}

