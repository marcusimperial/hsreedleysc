import { useEffect } from "react";

export default function Loader({ loader }) {
    useEffect(() => {
        import('./style.css');
        import('./responsive.css');
    })
    if(loader)
    return (
        <>
            <div className="container">
                <div className="space loader"></div>
                <h1>Please wait a few seconds...</h1>
            </div>


        </>
    )
    else return (<></>);

}
