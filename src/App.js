import { Navbar } from './navbar/Navbar';
import { Routes, Route } from 'react-router-dom'
import Login from './login/Login';
import Page from './404';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import NewGoogleButton from './NewGoogleButton';
import './index.css';
function App() {

  const location = useLocation();
  useEffect(() => {
    console.log(location.pathname);
  })

  return (
    <>
      <Routes>
        <Route exact path='/login' element={<NewGoogleButton />}/>
        <Route exact path='/' element={<Navbar />}/>
        <Route path="*" element={<Page/>}/>
      </Routes>
    </>

  );
}

export default App;
