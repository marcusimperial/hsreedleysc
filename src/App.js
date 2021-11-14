import { Navbar } from './components/Navbar';
import { Routes, Route } from 'react-router-dom'
import Login from './login/Login';

function App() {

  return (
    <>
    <Routes>
          <Route exact path='/login' element={<Login/>}/>
          <Route exact path='/' element={<Navbar/>}/>
    </Routes>
    </>

  );
}

export default App;
