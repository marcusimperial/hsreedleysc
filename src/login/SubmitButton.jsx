import { useHistory } from 'react-router-dom';

const SubmitButton = ({ token, section, submit, strand, setSubmit}) => {

    const condition1 = ((!section.includes(11) && !section.includes(12)));
    const condition2 = (strand && (section.includes(11) || section.includes(12)));

    if(section && !submit && (condition1 || condition2))
    return (
        <>
            <input type='button' value='Submit' onClick={() => {setSubmit(true); window.location.reload()}}></input>
        </>
    )
    else return (<></>)
}

export default SubmitButton
