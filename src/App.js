import { Navbar } from './components/Navbar';
import LoginButton from './login/GoogleButton';
import { Routes, Route} from 'react-router-dom'
import Page from './components/Page';
import Login from './login/Login';

function App() {

  return (
    <>
    <Login/>
    <Routes>
          <Route exact path='/yes' element={<Page/>}/>
          <Route exact path='/about' element={<Navbar/>}/>

    </Routes>
    </>

  );
}

export default App;
