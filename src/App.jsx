import { Routes, Route } from 'react-router-dom';
import Login from './login/Login.jsx';
import Page from './Page.jsx';
import Admin from './admin/Admin.jsx';
import './firebase.js';
import './index.css';

export default function App() {
    return (
        <>
            <Routes>
                <Route exact path='/login' element={<Login />}/>
                <Route exact path ='/admin' element={<Admin/>}/>
                <Route path="*" element={<Page />}/>
            </Routes>
        </>
    ) 
}