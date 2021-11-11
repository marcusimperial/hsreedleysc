import { Navbar } from './components/Navbar';
import LoginButton from './login/Button';
import { Routes, Route} from 'react-router-dom'
import Page from './components/Page';

function App() {

  return (
    <>
    <LoginButton></LoginButton>
    <Routes>
          <Route exact path='/yes' element={<Page/>}/>
          <Route exact path='/about' element={<Navbar/>}/>

    </Routes>
    </>

  );
}

export default App;
