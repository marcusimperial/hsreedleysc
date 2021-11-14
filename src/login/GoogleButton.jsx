import { GoogleLogin } from 'react-google-login';
import { verifyToken } from './requests';
import { registerUser } from './requests';
import { loadGoogleScript } from './google.js';
import { useEffect, useState } from 'react';

export default function Button({token, submit, setToken, setSubmit, setRegister}){

    const [googleAuth, setGoogleAuth] = useState();
    const [gapi, setGapi] = useState();

    const onSignIn = async (user) => {

        if(document.readyState !== 'complete') return;
        
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
          setGapi(_gapi);
          
          _gapi.load('auth2', () => { // (Ref. 3)
            (async () => { 
              const _googleAuth = await _gapi.auth2.init({ // (Ref. 4)
               client_id: clientId
              });
              setGoogleAuth(_googleAuth);
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
            <div id="google-signin"></div>
            <button className='btn-primary' onClick={logOut}>Log Out</button>
        </>
    )
    else return (<></>)
}