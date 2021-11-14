import express from 'express';
import path, {__dirname} from 'path';
const app = express();

const PORT = process.env.PORT || 5000;

app
  .use(express.static(path.join(__dirname, '/build')))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

app.get('/login', (req, res) => {
    res.redirect('/test/yes');
})
app.get('*', (req, res) => {

  res.sendFile(path.join(__dirname, '/build/index.html'));
});