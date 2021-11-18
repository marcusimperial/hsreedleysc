import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import { AiOutlineLogout } from 'react-icons/ai';
import Bar from './Bar';
export function Navbar({ test }) {
    useEffect(() => {
        import('./basic.css');
        import('./media.css');
        import('./sizing.css');
        import('./style.css');
        import('./utils.css');
        import('./dropdown.css');
        document.title = 'Home';

        const concernedElement = document.querySelector(".dropbtn");


    })

    const [menu, setMenu] = useState(false);
    const tests = async () => {
        cons
        await window.gapi.auth2.getAuthInstance().signOut();
        window.location.reload();
    }


    return (
        <div className="navbar">
            <div className="container flex">
                <nav>
                    <ul>
                        <li><Link to="projects.html">HOME</Link></li>
                        <li><Link to="projects.html">ABOUT</Link></li>
                    
                        <Bar name="EVENTS" id="h1" id2="sada" id3="z4" />
                        <Bar name="PROJECTS" id="h2" id2="asda" id3="h6"/>
                        <Bar name="PARTIES" id="h4" id2="a2" id3="z2"/>

                    </ul>
                </nav>
                <nav>
                    <ul>
                        <a href="https://www.facebook.com/ReedleySC"><FaFacebook size={30}/></a>
                        <a href="https://www.instagram.com/riscouncil"><FaInstagram size={30}/></a>
                        <a href="https://twitter.com/reedleyscouncil"><FaTwitter size={30}/></a>
                        <a onClick={() => {tests()}}><AiOutlineLogout size={30}/></a>
                    </ul>
                </nav>
            </div>
        </div>
    )
}