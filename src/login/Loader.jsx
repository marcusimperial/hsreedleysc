export default function Loader({ submit }) {
    if(submit)
    return (
        <>
            <div id="loaderdiv">
                <div className="loader"></div>
                <label id="sublbl">Please wait a few seconds...</label>
            </div>
        </>
    )
    else return (<></>);

}
