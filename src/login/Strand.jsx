import { useState } from "react";
import { registerUser  } from "./requests";

export default function Section({ token, section }) {
    const title = 'Select your Strand';
    const values = [ 'ABM','STEM','HUMSS','GA' ];
    const [strand, setStrand] = useState('');


    return (
        <>
            <div id='strand' className='seldivs'>
                <label className='selheaders'>{title}</label>
                <br />
                <select defaultValue={'s'} className="sels" id="strandsel" onChange={(e) => setStrand(e.target.value)}>
                    <option key='def' value='s' disabled></option>
                    {values.map((value, i) => (
                        <option key={`a${i}`}>{value}</option>
                    )
                    )}
            </select>
            </div>

            {
                strand && <input type='button' value='Submit' onClick={() => {registerUser(token, section, strand)}}></input>
            }
        </>



    )
}

