import express from 'express';
import { getPage, getPages, getPageList, getPostsList } from './pages/database.js';
import { verifySessionCookie } from './main/firebase.js';

const Router = express.Router();

Router.post('/pages', async (req, res) => {
    const auth = await verifySessionCookie(req.cookies.session);
    if (!auth) return res.json({ status: false }); 
    const pages = await getPages();
    if (pages) return res.json({ status: true, pages });
    else return res.json({ status: false }); 
});

Router.post('/page', async (req, res) => {
    const auth = await verifySessionCookie(req.cookies.session);
    if (!auth) return res.json({ status: false });
    const page = await getPage(req.body.page);
    if (page) return res.json({ status: true, page });
    else return res.json({ status: false }); 
});

Router.post('/pagelist', async (req, res) => {
    const auth = await verifySessionCookie(req.cookies.session);
    if (!auth) return res.json({ status: false });
    const list = await getPageList();
    if (list) return res.json({ status: true, list });
    else return res.json({ status: false }); 
})

Router.post('/postslist', async (req, res) => {
    const auth = await verifySessionCookie(req.cookies.session);
    if (!auth) return res.json({ status: false });
    const list = await getPostsList();
    if (list) return res.json({ status: true, list });
    else return res.json({ status: false }); 
})

export default Router;