import { useState } from 'react'
import { GoogleLogin } from 'react-google-login';

import Section from './Section';

const Button = () => {

    const [token, setToken] = useState(false);

    const onSignIn = (user) => {
        setToken(user.getAuthResponse().id_token);
    }
    const clientId = '724396208046-174g1j7ib3vhl3foa80j0sd4hvtcv3p9.apps.googleusercontent.com';

    return (
        <>
            {
            token ? 
            <Section token={token}/> : 
            <GoogleLogin 
            clientId={clientId}
            onSuccess={onSignIn} />
        }
        </>

    )
}

export default Button
