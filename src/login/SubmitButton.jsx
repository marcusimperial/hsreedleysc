import { registerUser } from "./requests";
const SubmitButton = ({ token, section, strand, setSubmit}) => {

    const condition1 = ((!section.includes(11) && !section.includes(12)));
    const condition2 = (strand && (section.includes(11) || section.includes(12)));

    if(section && (condition1 || condition2))
    return (
        <>
            <input type='button' value='Submit' onClick={() => {setSubmit(true); registerUser(token, section, strand)}}></input>
        </>
    )
    else return (<></>)
}

export default SubmitButton
