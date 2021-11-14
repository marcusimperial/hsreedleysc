import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import express from 'express';
import { addUser, checkUser, verifyToken } from './methods.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const router = express.Router();
const app = express();
app.use(express.static(path.join(__dirname, '/build')));
router.get('/', async (req, res) => {
    console.log('SERINNG THIS');
    const auth = await cookie(req);
    if (auth) res.sendFile(path.join(__dirname, '/build/index.html'));
    else res.redirect('/login')
  })
  
router.get('/login', async (req, res) => {
    const auth = await cookie(req);
    console.log(auth);
    if (auth) res.redirect('/');
    else res.sendFile(path.join(__dirname, '/build/index.html'));
})
  
router.get('*', async (req, res) => {
    console.log('SERVING');
    const auth = await cookie(req);
    console.log(auth);
    if (auth) res.sendFile(path.join(__dirname, '/build/index.html'));
    else res.redirect('/login')
});
router.post('/auth', async (req, res) => {
    console.log(req.body);
    const token = req.body.token;
    const verify = await verifyToken(token);
    if(verify){ //token is valid
        const check = await checkUser(verify[0]);
        if(check){ //the user exists
            res.cookie('key', 'testkey', { 
                expires: new Date(Date.now() + (60*60*24*365*10)),
                httpOnly: true });
            res.json({status:true})
        } else { //user does not exist
            res.cookie('token', token, { httpOnly: true, secure: true });
            
            res.json({status:false});
        } 
    } else res.json({status:false}) //token is invalid
  });
  router.post('/register', async (req, res) => {
    const data = req.body.data;
    const verify = await verifyToken(data.token);
    if(verify){ //token is valid
        const check = await checkUser(data.token);
        if(check) res.json({status:false}); //the user exists
        else { //the user doesn't exist
            const add = addUser(verify, data.section, data.strand);
            if(add) { //successful registration
                res.cookie('key', 'testkey', { 
                expires: new Date(Date.now() + (60*60*24*365*10)),
                httpOnly: true });
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

  export default router