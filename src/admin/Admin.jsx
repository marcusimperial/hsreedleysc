import { useState, useEffect } from 'react';
import Actions from './Actions.jsx';
import Create from './Create.jsx';
import Loader from './Loader.jsx';
import Add from './Add.jsx';

export default function Admin(){

    useEffect(() => {
        import('./utils.css');
        import('./sizes.css');
        document.title = 'Admin'
    }, []);

    const [action, setAction] = useState('');
    const [loader, setLoader] = useState(false);


    return (
        <>
            <Actions action={action} setAction={setAction} loader={loader} />
            <Create action={action} setAction={setAction} loader={loader} setLoader={setLoader} />
            <Add action={action} setAction={setAction} loader={loader} setLoader={setLoader} />
            <Loader loader={loader} />


        </>
    )
}