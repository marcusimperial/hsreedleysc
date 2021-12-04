import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineMenu } from 'react-icons/ai';
import Bar from './Bar';
import { signOut } from './requests';

export function Navbar() {

    const sizing = () => {
        const mq = window.matchMedia( "(max-width: 760px)" );
        const list = document.querySelector(".myLinks");
        if(mq.matches) list.style.display = "none";
        else list.style.display = "block";
    }

    const mobile = () => {
        var x = document.querySelector(".myLinks");
        if (x.style.display === "block") x.style.display = "none";
        else x.style.display = "block";
    }
    
    useEffect(() => {
        import('./basic.css');
        import('./dropdown.css');
        import('./media.css');
        
        document.title = 'Home';
        window.onresize = sizing;
    })


    const a = [{name: "The Valentine's Day FUndraiser", route: 'sdsd'}]

    return (
        
        <div className="navbar">
            <div className="container flex">
                <a className="mobile" onClick={mobile}><AiOutlineMenu size={30} /></a>
                <nav className="myLinks">
                    <ul>
                        <li><Link to="projects.html">HOME</Link></li>
                        <li><Link to="projects.html">ABOUT</Link></li>
                    
                        <Bar name="EVENTS" pages={a} />
                        <Bar name="PROJECTS" pages={a} />
                        <Bar name="PARTIES" pages={a} />

                        <li><a href="" onClick={signOut}>SIGN OUT</a></li>

                    </ul>
                </nav>
            </div>
        </div>
    )
}