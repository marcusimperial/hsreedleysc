import { Routes, Route } from 'react-router-dom';
import Login from './login/Login.jsx';
import Page from './Page.jsx';
import Admin from './admin/Admin.jsx';
import Store from './store/Parent.jsx';
import './firebase.js';
import './index.css';

export default function App() {
    return (
        <>
            <Routes>
                <Route exact path='/login' element={<Login />}/>
                <Route exact path ='/admin' element={<Admin/>}/>
                <Route exact path ='/store' element={<Store/>}/>
                <Route path="*" element={<Page />}/>
            </Routes>
        </>
    ) 
}