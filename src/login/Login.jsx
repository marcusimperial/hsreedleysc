import { useState, useEffect } from 'react'
import GoogleButton from './GoogleButton';
import Loader from './Loader';

export default function Login() {

    // Declare States in Parent File to Maintain Status
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        import('./style.css');
        import('./media.css');
        document.title = 'Login'
    });

    return (
        <>  
            <GoogleButton setLoader={setLoader} loader={loader} />
            <Loader loader={loader} />
        </>
    )
}

