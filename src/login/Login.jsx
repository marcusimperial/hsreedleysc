import { useState, useEffect } from 'react'
import GoogleButton from './GoogleButton';
import Section from './Section';
import Strand from './Strand';
import SubmitButton from './SubmitButton'
import Loader from './Loader';

import { registerUser } from "./requests";

const Login = () => {

    // Declare States in Parent File to Maintain Status
    const [token, setToken] = useState('');
    const [section, setSection] = useState('');
    const [strand, setStrand] = useState('');
    const [submit, setSubmit] = useState(false);


    return (
        <>
            <GoogleButton token={token} setToken={setToken}/>
            <Section token={token} setSection={setSection} />
            <Strand token={token} section={section} setStrand={setStrand} />
            <SubmitButton token={token} section={section} strand={strand} />
            <Loader />
        </>
    )
}

export default Login
