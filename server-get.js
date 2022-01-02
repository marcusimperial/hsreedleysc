import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import express from 'express';
import { verifySessionCookie } from './firebase-server.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const Router = express.Router();

const app = express();
import cookieParser from 'cookie-parser';
app.use(cookieParser());

Router.get('/login', async (req, res) => {
    console.log('SERVING ON LOGIN ROUTE');
    const auth = await verifySessionCookie(req.cookies.session);
    console.log(`LOGIN ROUTE AUTH: ${auth}`);
    if (auth) res.redirect('/');
    else res.sendFile(path.join(__dirname, '/build/index.html'));
})

Router.get('/', async (req, res) => {
    console.log('SERVING / ROUTE')
    const auth = await verifySessionCookie(req.cookies.session);
    console.log(`/ ROUTE AUTH: ${auth}`);
    if (auth) res.sendFile(path.join(__dirname, '/build/index.html'));
    else res.redirect('/login')
});
  
Router.get('*', async (req, res, next) => {
    console.log(`${req.cookies.session} HERES THE COOKIE !!!`)
    const auth = await verifySessionCookie(req.cookies.session);
    console.log(auth);
    if (auth) res.sendFile(path.join(__dirname, '/build/index.html'));
    else res.redirect('/login');
});

export default Router