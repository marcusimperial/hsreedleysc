import express from 'express';
import { generateCookie, revokeSessionCookie } from './firebase-server.js';

const Router = express.Router();
const app = express();

Router.post('/login', async (req, res) => {
    const token = req.body.token;
    console.log(token);
    console.log('LOGIN RECEIVED');
    const sessionCookie = await generateCookie(token);
    console.log(`LOGIN STATUS: ${sessionCookie.cookie}`);
    if (!sessionCookie) res.json({ status: false });
    else {
        const options = { maxAge: sessionCookie.expiry.expiresIn, httpOnly: true };
        res.cookie('session', sessionCookie.cookie, options);
        res.json({ status: true });
    }
});

Router.post('/logout', async (req, res) => {
    console.log('LOGOUT RECEIVED');
    const sessionCookie = req.cookies ? req.cookies.session : '';
    console.log(sessionCookie);
    const revokeCookie = await revokeSessionCookie(sessionCookie);
    res.clearCookie('session'); 
    if (revokeCookie) res.json({ status: true });
    else res.json({ status: false });
});

export default Router