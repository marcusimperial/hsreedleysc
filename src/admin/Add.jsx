import { useEffect, useState } from "react"
import { getPageList } from '../requests.js';
import { addPost } from './requests.js';

export default function Add({ action, setAction, loader, setLoader }){

    const [pages, setPages] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('');
    const [uploadPage, setUploadPage] = useState('');
    const [file, setFile] = useState('');
    const [link, setLink] = useState('');

    const sendReq = async () => {
        let obj;
        if (title && type && description && uploadPage) obj = { title, type, description, uploadPage };
        else return alert('Please fill out all required fields.'); 
        if (type === 'image' || type === 'video') {
            if (file) obj.file = file;
            else return alert('Please fill out all required fields.'); 
        }
        if (link) obj.link = link;
        setLoader(true);
        const req = await addPost(obj);
        if (req) alert('Action success!');
        else alert('Action failed.');
        setLoader(false);
        setAction('');
    }

    useEffect(() => {
        const extractPages = async () => {
            const storage = sessionStorage.getItem('pages');
            if (storage) return JSON.parse(storage); 
            else return [];
        }
        const extractList = async () => {
            let query;
            let list = [];
            setLoader(true);
            const main = await extractPages();
            if (main.length) query = main;
            else query = await getPageList();
            for (const { data: { title, route } } of query) list.push({ title, route });
            setPages(list);  
            setLoader(false);
        }
        extractList();
    }, []);

    if (action === 'add' && !loader && pages.length) return (
        <>
            <div className="container py-2">
                <div className="background my-1">
                    <h1 className="xl center">Add a Post to Your Page</h1>
                    <div className="form my-1">
                        <h1 className="md">Input Your Post Title</h1>
                        <input id="s" type="text" onChange={(e) => setTitle(e.target.value)} />
                    </div>
                    <div className="form my-1">
                        <h1 className="md">Input Your Post Description</h1>
                        <input id="s" type="text" onChange={(e) => setDescription(e.target.value)}/>
                    </div>
                    <div className="form my-1">
                        <h1 className="md">Select the Page to Upload To</h1>
                        <select onChange={(e) => setUploadPage(e.target.value)}>
                            <option value="">-</option>
                            {pages.map(({ title, route }) => (<option value={route}>{`${title}`}</option>))}
                        </select>
                    </div>
                    <div className="form my-1">
                        <h1 className="md">Select the Post Type</h1>
                        <select onChange={(e) => setType(e.target.value)}>
                            <option value="">-</option>
                            <option value="image">Image</option>
                            <option value="video">Video</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    {(type === 'image') && 
                        <div className="form my-1">
                            <h1 className="md">Upload Your Image</h1>
                            <input type="file" name="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} />
                        </div>}
                    {(type === 'video') && 
                        <div className="form my-1">
                            <h1 className="md">Upload Your Video</h1>
                            <input type="file" name="file" accept="video/*" onChange={(e) => setFile(e.target.files[0])} />
                        </div>}
                    <div className="form my-1">
                        <h1 className="md">Input Your Re-direct Link (Optional Field)</h1>
                        <h2 className="lead">This makes a button that re-directs users to link if clicked on.</h2>
                        <input id="s" type="text" onChange={(e) => setLink(e.target.value)} />
                    </div>

                    <div>
                        <button onClick={() => setAction('')} className="button md">Back</button>
                        <button onClick={sendReq} className="button submit md">Submit</button>
                    </div>
                </div>
            </div>
        </>
    ) 
    else return (<></>)
}