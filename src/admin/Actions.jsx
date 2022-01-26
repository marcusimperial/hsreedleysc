export default function Actions({ action, setAction, loader }) {
    if (!action && !loader) return (
        <div className="container py-2">
            <div className="center background my-1">
                <h1 className="xl">Select your Action</h1>
                <div className="actions">
                    <div className="create py-1">
                        <button onClick={() => setAction('create')} className="button md">+ Create Your New Page</button>
                    </div>
                    <div className="border"></div>
                        <div className="add py-1">
                        <button onClick={() => setAction('add')} className="button md">+ Add a Post to Your Page</button>
                    </div>
                </div>
            </div>
        </div>
    )
    else return (<></>)
}