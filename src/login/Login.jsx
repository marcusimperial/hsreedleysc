import { useState, useEffect } from 'react'
import GoogleButton from './GoogleButton';



export default function Login() {

    // Declare States in Parent File to Maintain Status
    const [token, setToken] = useState('');
    const [section, setSection] = useState('');
    const [strand, setStrand] = useState('');
    const [submit, setSubmit] = useState(false);
    const [register, setRegister] = useState(false);

    useEffect(() => {
        import('./style.css');
        import('./responsive.css');
        document.title = 'Login'
    });

    return (
        <>
            <GoogleButton submit={submit} token={token} setToken={setToken} setRegister={setRegister} setSubmit={setSubmit} />
        </>
    )
}

