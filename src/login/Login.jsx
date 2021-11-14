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
            <GoogleButton submit={submit} token={token} setToken={setToken}/>
            <Section submit={submit} token={token} setSection={setSection} />
            <Strand submit={submit} token={token} section={section} setStrand={setStrand} />
            <SubmitButton token={token} section={section} strand={strand} setSubmit={setSubmit} />
            <Loader submit={submit}/>
        </>
    )
}

export default Login
