import { useEffect } from "react";

export default function Strand({ token, section, submit, register, setStrand }) {
    const title = 'Select your Strand';
    const values = [ 'ABM','STEM','HUMSS','GA' ];
    
    useEffect(() => {
        if(!(!submit && token && register && section && (section.includes(11) || section.includes(12))))
        setStrand('');
    })

    if (!submit && token && register && section && (section.includes(11) || section.includes(12)))
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
        </>
    )
    else return (<></>);

    

}

