import { useEffect } from "react";
import { Link } from 'react-router-dom';
import crypto from 'crypto';

export default function Bar({ name, pages = []}){
    
    const id = `bar-${crypto.randomBytes(16).toString("hex")}`;
    const id2 = `bar-${crypto.randomBytes(16).toString("hex")}`;
    const id3 = `bar-${crypto.randomBytes(16).toString("hex")}`;

    useEffect(() => {
        document.addEventListener("mousedown", (e) => {
            if(!document.querySelector(`#${id3}`)) return;
            if(!document.querySelector(`#${id3}`).contains(e.target)) if(!e.target.matches(`.${id2}`)) document.querySelector(`#${id}`).classList.remove('show');  
        })
    })

    return (
        <>
            <div className="dropdown">
                <li id={id3} className="dropbtn" onClick={() => { if(pages.length) document.getElementById(id).classList.toggle("show") }} ><a>{name}</a></li>
                <div className="dropdown-content" id={id}>
                    { pages.map(({ name, route }) => ( <Link key={`link-${crypto.randomBytes(16).toString("hex")}`} className={id2} to={route}>{name}</Link> )) } 
                </div>
            </div> 
        </>
    )
}
