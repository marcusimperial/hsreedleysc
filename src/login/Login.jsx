import { useState, useEffect } from 'react'
import GoogleButton from './GoogleButton';
import Section from './Section';
import Strand from './Strand';
import SubmitButton from './SubmitButton'
import Loader from './Loader';
import './style.css';
import './responsive.css';

export default function Login({ setGapi }) {

    // Declare States in Parent File to Maintain Status
    const [token, setToken] = useState('');
    const [section, setSection] = useState('');
    const [strand, setStrand] = useState('');
    const [submit, setSubmit] = useState(false);
    const [register, setRegister] = useState(false);

    useEffect(() => {
        document.title = 'Login'
    });

    return (
        <>
            <GoogleButton submit={submit} token={token} setToken={setToken} setRegister={setRegister} setSubmit={setSubmit} setGapi={setGapi}/>
            <Section submit={submit} token={token} register={register} setSection={setSection} />
            <Strand submit={submit} token={token} register={register} section={section} setStrand={setStrand}/>
            <SubmitButton token={token} register={register} section={section} strand={strand} setSubmit={setSubmit}/>
            <Loader submit={submit}/>
        </>
    )
}

