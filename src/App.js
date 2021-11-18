import { Navbar } from './components/Navbar';
import { Routes, Route } from 'react-router-dom'
import Login from './login/Login';
import Page from './components/404';
import { useState, useEffect } from 'react';

function App() {

  const [gapi, setGapi] = useState('');
  useEffect(() => {
    console.log(gapi);
  })

  return (
    <>
      <Routes>
        <Route exact path='/login' element={<Login setGapi={setGapi}/>}/>
        <Route exact path='/' element={<Navbar gapi={gapi}/>}/>
        <Route path="*" element={<Page/>}/>
      </Routes>
    </>

  );
}

export default App;
