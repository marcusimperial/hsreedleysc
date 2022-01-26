import { useState } from 'react';
import { createPage } from './requests.js';

export default function Create({ action, setAction, loader, setLoader }){

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [route, setRoute] = useState('');
    const [type, setType] = useState('');

    const sendReq = async () => {
        if (!title || !description || !route || !type) return alert('Please fill out all values.');
        setLoader(true);
        const req = await createPage(title, description, route, type);
        if (req) alert('Action success!');
        else alert('Action failed.');
        setLoader(false);
        setAction('');
    }

    if (action === 'create' && !loader) return (
        <div className="container py-2">
            <div className="background my-1">
                <h1 className="xl center">Create Your New Page</h1>
                <div className="form my-1">
                    <h1 className="md">Input Your Page Title</h1>
                    <input id="s" type="text" onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className="form my-1">
                    <h1 className="md">Input Your Page Description</h1>
                    <input id="s" type="text" onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div className="form my-1">
                    <h1 className="md">Input Your Page Route</h1>
                    <input id="s" type="text" onChange={(e) => setRoute(e.target.value.toLowerCase())} />
                </div>
                <div className="form my-1">
                    <h1 className="md">Select the Page Type</h1>
                    <select onChange={(e) => setType(e.target.value)}>
                        <option value="">-</option>
                        <option value="project">Projects</option>
                        <option value="event">Events</option>
                        <option value="party">Parties</option>
                    </select>
                </div>
                <div>
                    <button onClick={() => setAction('')} className="button md">Back</button>
                    <button onClick={sendReq} className="button submit md">Submit</button>
                </div>
            </div>
        </div>
    )
    else return (<></>)
}