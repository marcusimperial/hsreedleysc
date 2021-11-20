import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import { AiOutlineLogout, AiOutlineMenu } from 'react-icons/ai';
import Bar from './Bar';
import { signOut } from './requests';
export function Navbar({ test }) {
    useEffect(() => {
        import('./basic.css');
        import('./media.css');
        import('./style.css');
        import('./utils.css');
        import('./dropdown.css');
        document.title = 'Home';

    })

    const myFunction = () => {
        var x = document.querySelector(".myLinks");
        if (x.style.display === "block") x.style.display = "none";
        else x.style.display = "block";
    }

    return (
        
        <div className="navbar">
            <div className="container flex">
                <a className="mobile" onClick={myFunction}><AiOutlineMenu size={30} /></a>
                <nav className="myLinks">
                    <ul>
                        <li><Link to="projects.html">HOME</Link></li>
                        <li><Link to="projects.html">ABOUT</Link></li>
                    
                        <Bar name="EVENTS" id="h1" id2="sada" id3="z4" />
                        <Bar name="PROJECTS" id="h2" id2="asda" id3="h6"/>
                        <Bar name="PARTIES" id="h4" id2="a2" id3="z2"/>
                        <li><Link to="projects.html">SIGN OUT</Link></li>

                    </ul>
                </nav>
            </div>
        </div>
    )
}