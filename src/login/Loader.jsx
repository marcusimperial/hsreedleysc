import { useEffect } from "react";

export default function Loader({ loader }) {
    useEffect(() => {
        import('./style.css');
        import('./responsive.css');
    })
    if(loader)
    return (
        <>
            <div className="space"></div>
            <div id="loaderdiv">
                <div className="loader"></div>
                <label id="sublbl">Please wait a few seconds...</label>
            </div>
        </>
    )
    else return (<></>);

}
