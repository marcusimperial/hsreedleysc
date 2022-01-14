import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import express from 'express';
import { generateCookie, revokeSessionCookie, verifySessionCookie } from './main/firebase.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const Router = express.Router();

Router.get('/login', async (req, res) => {
    const auth = await verifySessionCookie(req.cookies.session);
    if (auth) return res.redirect('/');
    else return res.sendFile(path.join(__dirname, '../build/index.html'));
})

Router.get('*', async (req, res, next) => {
    const auth = await verifySessionCookie(req.cookies.session);
    if (auth) return res.sendFile(path.join(__dirname, '../build/index.html'));
    else return res.redirect('/login');
});
Router.post('/login', async (req, res) => {
    const token = req.body.token;
    const sessionCookie = await generateCookie(token);
    if (!sessionCookie) return res.json({ status: false });
    const options = { maxAge: sessionCookie.expiry.expiresIn, httpOnly: true, secure: true };
    res.cookie('session', sessionCookie.cookie, options);
    return res.json({ status: true });
});

Router.post('/logout', async (req, res) => {
    const revokeCookie = await revokeSessionCookie(req.cookies.session);
    res.clearCookie('session'); 
    if (revokeCookie) return res.json({ status: true });
    else return res.json({ status: false });
});

export default Router