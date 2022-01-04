import { useState, useEffect } from 'react'
import GoogleButton from './GoogleButton';
import Loader from './Loader';


export default function Login() {

    // Declare States in Parent File to Maintain Status
    const [token, setToken] = useState('');
    const [section, setSection] = useState('');
    const [strand, setStrand] = useState('');
    const [submit, setSubmit] = useState(false);
    const [register, setRegister] = useState(false);
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        import('./style.css');
        import('./responsive.css');
        document.title = 'Login'
    });

    return (
        <>
            
            <GoogleButton setLoader={setLoader} loader={loader} />
            <Loader loader={loader} />
        </>
    )
}

