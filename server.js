/* DECLARATIONS AND IMPORTS */
import express from 'express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import auth from './auth.js';
import db from './db.js'; 
/* SETUP */
const app = express();
const port = process.env.PORT || 8080;
const route = dirname(fileURLToPath(import.meta.url));
app.use(express.static('public'));
app.use(express.static('login'));
app.use(express.static('home'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
/* GET REQUEST HANDLERS */
app.get('/', async (req, res) => {
    const auth = await cookie(req);
    if(auth) res.sendFile('./home/Home.html', { root: route });
    else res.redirect('/login')
});
app.get('/login', async (req, res) => {
    const auth = await cookie(req);
    if(auth) res.redirect('/');
    else res.sendFile('./login/client.html', { root: route });
});
app.get('/signout', async (req, res) => { //TEMPORARY ROUTE
    res.clearCookie('key');
    res.json({status:true});
});
app.get('/:a', async (req, res) => {
    const param = req.params.a;
    const auth = await cookie(req);
    if(auth){
        if(param === 'projects') 
        res.sendFile('./home/Projects.html', { root: route });
        else res.redirect('/')
    } else res.redirect('/login')
})
app.get('/:a/:b', async (req, res) => {
    const paramA = req.params.a;
    const paramB = req.params.b;
    const auth = await cookie(req);
    if(auth){
        if(paramA === 'projects' && paramB === 'ns2021') 
        res.sendFile('./public/404.html', { root: route });
        else res.redirect('/')
    } else res.redirect('/login')
});
/* POST REQUEST HANDLERS */
app.post('/signout', async (req, res) => {
    res.clearCookie('key');
    res.json({status:true});
});
app.post('/auth', async (req, res) => {
    const token = req.body.token;
    const verify = await auth.verifyToken(token);
    if(verify){ //token is valid
        const check = await db.checkUser(verify[0]);
        if(check){ //the user exists
            res.cookie('key', 'testkey', { 
                expires: new Date(Date.now() + 900000),
                httpOnly: true, secure: true });
            res.json({status:true})
        } else { //user does not exist
            res.cookie('token', token, { httpOnly: true, secure: true });
            
            res.json({status:false});
        } 
    } else res.json({status:false}) //token is invalid
});
app.post('/register', async (req, res) => {
    const data = req.body.data;
    const verify = await auth.verifyToken(data[0]);
    if(verify){ //token is valid
        const check = await db.checkUser(verify[0]);
        if(check) res.json({status:false}); //the user exists
        else { //the user doesn't exist
            const add = db.addUser(verify, data[1]);
            if(add) { //successful registration
                        res.cookie('key', 'testkey', { 
                expires: new Date(Date.now() + 900000),
                httpOnly: true, secure: true });
            res.json({status:true})
            } else res.json({status:false}); //unsuccessful registration
        }
    } else res.json({status:false}) //token is invalid
});
/* COOKIE HANDLER */
const cookie = async (req) => {
    const cookies = req.headers.cookie;
    if(!cookies||!cookies.includes('key')) return false;
    else {
        const key = req.headers.cookie.split('key=')[1]
        .split(';')[0];
        if(key === 'testkey') return true;
        else return false
    }
}
/* ERROR HANDLER AND LISTENER */
app.use((req, res) => {
    res.sendFile('./public/404.html', { root: route });
});
app.listen(port, "0.0.0.0", () => {
  console.log(`Server listening on port ${port}...`);
});