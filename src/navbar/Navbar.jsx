import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineMenu } from 'react-icons/ai';
import Bar from './Bar';
import { userLogOut } from '../requests.js';
import { signOut, getAuth } from "firebase/auth";

export function Navbar() {

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
        console.log(x.style.display);
        
        if (x.style.display === "block") x.style.display = "none";
        else if (x.style.display === "none") x.style.display = "block";
        else x.style.display = "none";
    }
    
    useEffect(() => {
        import('./main.css');
        import('./dropdown.css');
        import('./media.css');
        
        document.title = 'Home';
        window.onresize = sizing;
    })


    const a = [{name: "The Valentine's Day FUndraiser", route: 'sdsd'}]

    return (
        
        <div className="navbar">
            <div className="container flex">
                <button className="mobile" onClick={mobile}><AiOutlineMenu size={30} /></button>
                <nav className="myLinks">
                    <ul>
                        <li><Link to="projects.html">HOME</Link></li>
                        <li><Link to="projects.html">ABOUT</Link></li>
                        <li><Bar name="EVENTS" pages={a}/></li>
                        <li><Bar name="PROJECTS" pages={a}/></li>
                        <li><Bar name="PARTIES" pages={a}/></li>
                        <li><button onClick={signOutUser}>SIGN OUT</button></li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}