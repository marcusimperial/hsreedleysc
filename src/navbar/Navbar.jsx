import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineMenu } from 'react-icons/ai';
import Bar from './Bar';
import { userLogOut } from '../requests.js';
import { signOut, getAuth } from "firebase/auth";

export default function Navbar({ events, projects, parties }) {

    const signOutUser = async () => {
        const authObj = getAuth();
        await signOut(authObj);
        await userLogOut();
    }

    const sizing = () => {
        const mq = window.matchMedia( "(max-width: 760px)" );
        const list = document.querySelector(".myLinks");
        if(mq.matches) list.style.display = "none";
        else list.style.display = "block";
    }

    const mobile = () => {
        let x = document.querySelector(".myLinks");
        if (x.style.display === "block") x.style.display = "none";
        else if (x.style.display === "none") x.style.display = "block";
        else x.style.display = "none";
    }
    
    useEffect(() => {
        import('./style.css');
        import('./dropdown.css');
        import('./media.css');
        window.onresize = sizing;
    })

    return (
        <div className="navbar">
            <div className="containers flexs">
                <button className="mobile" onClick={mobile}><AiOutlineMenu size={30} /></button>
                <nav className="myLinks">
                    <ul>
                        <li><Link to="/">HOME</Link></li>
                        <li><a href="/admin">ADMIN</a></li>
                        <Bar name="EVENTS" pages={events}/>
                        <Bar name="PROJECTS" pages={projects}/>
                        <Bar name="PARTIES" pages={parties}/>
                        <li><button onClick={signOutUser}>SIGN OUT</button></li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}