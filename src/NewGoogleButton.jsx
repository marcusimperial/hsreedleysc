import { auth } from "./firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

export default function NewGoogleButton(){

    const flow = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const a = await signInWithPopup(auth, provider);
            console.log(a.user.accessToken);
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div>
            <button onClick={flow}>CLick me</button>
        </div>
    )
}

