import { verifyToken } from './requests';
import { registerUser } from './requests';
import { GoogleLogin } from 'react-google-login';
import GoogleButton from 'react-google-button'
import { loadGoogleScript } from './google.js';
import { useEffect } from 'react';

export default function Button({ token, submit, setToken, setSubmit, setRegister}){

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




    return (
        <>

    <GoogleLogin height={40} width={500}
    clientId={clientId}
    render={renderProps => (
      <GoogleButton height={40} width={500} label='Sign in with Risfamily' type='light' onClick={renderProps.onClick}/>
    )}
    onSuccess={onSignIn}
    cookiePolicy={'single_host_origin'}
  />

        </>
    )

}