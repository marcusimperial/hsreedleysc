import { useEffect } from "react";
import { Link } from 'react-router-dom';
export default function Bar({ id, id2, id3, name }){

    useEffect(() => {
        document.addEventListener("mousedown", (e) => {
            // If something selected outside of the bar
            const selection = document.querySelector(`#${id3}`);
            if(!selection) return;
            if(!selection.contains(e.target)) {
                // If the bar is not selected
                if(!e.target.matches(`.${id2}`)) document.querySelector(`#${id}`).classList.remove('show');  
            } 
        })
    })
    return (
        <>
            <div className="dropdown">
                <li id={id3} className="dropbtn" onClick={() => {document.getElementById(id).classList.toggle("show")}} ><a>{name}</a></li>
                <div className="dropdown-content" id={id}>
                    <Link className={id2} style={{style: 'pink'}}to="projects.html">REEady to Lead</Link>
                    <Link className={id2} to="projects.html">ad</Link>
                    <a href="#">Link 3</a>
                </div>
            </div> 
        </>
    )
}
