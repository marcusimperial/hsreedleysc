import { registerUser } from './requests';

export default function SubmitButton({ token, section, submit, strand, register, setSubmit}) {

    const condition1 = ((!section.includes(11) && !section.includes(12)));
    const condition2 = (strand && (section.includes(11) || section.includes(12)));

    const onRegister = async () => {
        setSubmit(true);
        const register = await registerUser(token, section, strand);
        if(register) alert('Registration sUCCESS');
        else alert('registration unsuccessful');
        setSubmit(false);
        window.location.reload();
    }

    if(token && section && !submit && register && (condition1 || condition2))
    return (
        <>
            <input type='button' value='Submit' onClick={() => {onRegister()}}></input>
        </>
    )
    else return (<></>)
}