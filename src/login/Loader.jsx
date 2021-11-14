import '../index.css'
const Loader = ({ submit }) => {
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

export default Loader
