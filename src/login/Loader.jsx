export default function Loader({ loader }) {
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
