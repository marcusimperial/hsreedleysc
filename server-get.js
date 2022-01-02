import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import express from 'express';
import { verifySessionCookie } from './firebase-server.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const Router = express.Router();
const app = express();
app.use(express.static(path.join(__dirname, '/build')));

Router.get('/login', async (req, res) => {
    const sessionCookie = req.cookies ? req.cookies.session : '';
    console.log('SERVING ON * ROUTE');
    const auth = await verifySessionCookie(sessionCookie);
    console.log(auth);
    if (auth) res.redirect('/login');
    else res.sendFile(path.join(__dirname, '/build/index.html'));
})

Router.get('/', async (req, res) => {
    const sessionCookie = req.cookies ? req.cookies.session : '';
    console.log(sessionCookie);
    const auth = await verifySessionCookie(sessionCookie);
    if (auth) res.sendFile(path.join(__dirname, '/build/index.html'));
    else res.redirect('/login')
});

  
Router.get('*', async (req, res) => {
    const sessionCookie = req.cookies ? req.cookies.session : '';
    console.log('SERVING ON * ROUTE');
    const auth = await verifySessionCookie(sessionCookie);
    console.log(auth);
    if (auth) res.sendFile(path.join(__dirname, '/build/index.html'));
    else res.redirect('/login');
});

export default Router