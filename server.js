import express from 'express';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import Admin from './server/server-admin.js';
import Main from './server/server-main.js';
import Pages from './server/server-pages.js';
import cookieParser from 'cookie-parser';
import fileUploader from 'express-fileupload';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '/build'), { index: false }));
app.use(cookieParser());
app.use(fileUploader());
app.use(Admin);
app.use(Main);
app.use(Pages);

app.listen(PORT, () => console.log(`Listening on ${PORT}`));