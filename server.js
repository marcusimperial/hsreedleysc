import express from 'express';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import getRequests from './server-get.js';
import postRequests from './server-post.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const PORT = process.env.PORT || 3001;
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(path.join(__dirname, '/build')));
app.use(getRequests);
app.use(postRequests);

app.listen(PORT, () => console.log(`Listening on ${PORT}`));