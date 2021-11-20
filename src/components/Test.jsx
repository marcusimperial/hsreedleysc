import { useEffect } from "react"
import { AiOutlineLogout } from 'react-icons/ai';
import Bar from './Bar';
import { signOut } from './requests';
import { AiOutlineMenu } from 'react-icons/ai';

const Test = () => {

    useEffect(()=>{
        
        import('./basic.css');
        import('./media.css');
        import('./style.css');
        import('./utils.css');
        import('./dropdown.css');
        import('./test.css');
    })

    const myFunction = () => {
        var x = document.getElementById("myLinks");
        if (x.style.display === "block") {
          x.style.display = "none";
        } else {
          x.style.display = "block";
        }
      }
    
      
    return (
<div className="navbar">
    <div className="container flex">
    <a onClick={myFunction}><AiOutlineMenu size={30} /></a>

    <nav id="myLinks">
        <ul>
            <Bar name="EVENTS" id="h1" id2="sada" id3="z4" />
            <Bar name="PROJECTS" id="h2" id2="asda" id3="h6"/>
            <Bar name="PARTIES" id="h4" id2="a2" id3="z2"/>
            <a onClick={() => {signOut()}}><AiOutlineLogout size={30}/></a>
        </ul>
    </nav>


    </div>

</div>
    )
}

export default Test
