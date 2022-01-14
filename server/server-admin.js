import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import express from 'express';
import { adminVerifySessionCookie } from './admin/firebase.js';
import { addPage, addPost } from './admin/database.js';
import { uploadFile } from './admin/gcs.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const Router = express.Router();

Router.get('/admin', async (req, res) => {
    const auth = await adminVerifySessionCookie(req.cookies.session);
    if (auth) return res.sendFile(path.join(__dirname, '../build/index.html'));
    else return res.redirect('/');
});

Router.post('/create', async (req, res) => {
    const auth = await adminVerifySessionCookie(req.cookies.session);
    if (!auth) return res.json({ status: false }); 
    const route = req.body.route;
    const title = req.body.title;
    const description = req.body.description;
    const type = req.body.type
    console.log(route, title, description, type);
    if (!route || !title || !description || !type) return res.json({ status: false });
    const add = await addPage(title, description, route, type);
    if (add) return res.json({ status: true }); 
    else return res.json({ status: false });
})

Router.post('/add', async (req, res) => {
    const auth = await adminVerifySessionCookie(req.cookies.session);
    if (!auth) return res.json({ status: false }); 
    const title = req.body.title;
    const description = req.body.description;
    const type = req.body.type;
    const uploadPage = req.body.uploadPage;
    let file = req.files;
    if (file) file = req.files.file;
    const link = req.body.link;
    let obj;
    if (title && type && description && uploadPage) obj = { title, type, description, route: uploadPage };
    else return res.json({ status: false });
    if (type === 'image' || type === 'video') {
        if (file) {
            obj.file = file;
            const upload = await uploadFile(file);
            if (!upload) return res.json({ status: false }); 
            obj.file = file.name;
        }
        else return res.json({ status: false });
    }
    if (link) obj.link = link;
    const add = await addPost(uploadPage, obj);
    if (add) return res.json({ status: true }); 
    else return res.json({ status: false });
})


export default Router;