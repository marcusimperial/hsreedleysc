import { useEffect } from "react";

export default function Loader({ submit }) {
    useEffect(() => {
        import('./style.css');
        import('./responsive.css');
    })
    if(submit)
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
