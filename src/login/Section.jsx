import { useState } from "react";
import Strand from "./Strand";

export default function Section({ token, submit, setSection }) {
    const title = 'Select your Level and Section';
    const values = [
        '7 Georgetown','7 Stanford','7 Berkeley',
        '8 Columbia','8 Cornell','8 Fordham',
        '9 Princeton','9 Harvard','9 Pepperdine',
        '10 Cambridge','10 Duke','10 Purdue',
        '11 Maya Angelou','11 Galileo',
        '12 Leonardo Da Vinci', '12 Marie Curie'
    ];

    if(token && !submit)
    return (
        <>
            <div id='lvlsec' className='seldivs'>
                <label className='selheaders'>{title}</label>
                <br />
                <select defaultValue={'s'} className="sels" id="levelsecsel" onChange={(e) => setSection(e.target.value)}>
                    <option key='def' value='s' disabled></option>
                    {values.map((value, i) => (
                        <option key={`a${i}`}>{value}</option>
                    )
                    )}
            </select>
            </div>

        </>
    )
    else return (<>{setSection('')}</>)
}

