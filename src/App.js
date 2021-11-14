import { Navbar } from './components/Navbar';
import { Routes, Route } from 'react-router-dom'
import Login from './login/Login';
import Page from './components/404';


function App() {

  return (
    <>
    <Routes>
          <Route exact path='/login' element={<Login/>}/>
          <Route exact path='/' element={<Navbar/>}/>
          <Route path="*" element={<Page/>}/>
    </Routes>
    </>

  );
}

export default App;
