import { GoogleLogin } from 'react-google-login';
import { verifyToken } from './requests';
import { registerUser } from './requests';
import { loadGoogleScript } from './google.js';
import { useEffect, useState } from 'react';

export default function Button({setGapi, token, submit, setToken, setSubmit, setRegister}){

    const onSignIn = async (user) => {

        if(document.readyState !== 'complete') {
          return;
        };
        
        const token = user.getAuthResponse().id_token;
        setToken(token);
        
        const profile = user.getBasicProfile();
        const email = profile.getEmail();

        setSubmit(true);
        const verify = await verifyToken(token);
        setSubmit(false);
        if (verify) window.location.reload();
        else {
            if(email.charAt(0) === 's') setRegister(true);
            else {
                setSubmit(true);
                const register = await registerUser(token);
                if(register) alert('Registration of NON STUDENT Success');
                else alert('registration of NON STUDENT unsuccessful');
                setSubmit(false);
                window.location.reload();
            }
        }
    }

    const clientId = '724396208046-174g1j7ib3vhl3foa80j0sd4hvtcv3p9.apps.googleusercontent.com';

    const renderSigninButton = (_gapi) => { // (Ref. 6)
        _gapi.signin2.render('google-signin', {
          'scope': 'profile email',
          'width': 325,
          'height': 70,
          'longtitle': true,
          'theme': 'light',
          'onsuccess': onSignIn
        });
      }
      
      
    useEffect(() => {
        
        // Window.gapi is available at this point
        window.onGoogleScriptLoad = () => { // (Ref. 1)
         
          const _gapi = window.gapi; // (Ref. 2)
          
          _gapi.load('auth2', () => { // (Ref. 3)
            (async () => { 
              const _googleAuth = await _gapi.auth2.init({ // (Ref. 4)
               client_id: clientId
              });
              console.log(_googleAuth);
              setGapi(_gapi);
              await _gapi.auth2.getAuthInstance().signOut();
              renderSigninButton(_gapi); // (Ref. 6)
            })();
          });
        }
        
        // Ensure everything is set before loading the script
        loadGoogleScript(); // (Ref. 9)
    }, []);


    if(!token && !submit)
    return (
        <>
          <header className="container">
            <section id="sec" className="container">
              <h1 id="mainlbl">The<br/>SC Website</h1>
              <div className="googlebutton" id="google-signin"></div>
            </section>
          </header>
            
        </>
    )
    else return (<></>)
}