import { useState } from 'react'
import { GoogleLogin } from 'react-google-login';

import Section from './Section';

const Button = ({token, submit, setToken}) => {

    const onSignIn = (user) => {
        const token = user.getAuthResponse().id_token;
        setToken(token);
        const
    }

    const clientId = '724396208046-174g1j7ib3vhl3foa80j0sd4hvtcv3p9.apps.googleusercontent.com';

    if(!token && !submit)
    return (
        <>
            <GoogleLogin clientId={clientId} onSuccess={onSignIn} />
        </>
    )
    else return (<></>)
}

export default Button
