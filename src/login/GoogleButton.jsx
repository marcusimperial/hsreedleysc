import { GoogleLogin } from 'react-google-login';
import { verifyToken } from './requests';

export default function Button({token, submit, setToken, setSubmit, setRegister}){

    const onSignIn = async (user) => {
        const token = user.getAuthResponse().id_token;
        setToken(token);
        setSubmit(true);
        console.log(token);
        const verify = await verifyToken(token);
        setSubmit(false);
        if (verify) window.location.reload();
        else setRegister(true);
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