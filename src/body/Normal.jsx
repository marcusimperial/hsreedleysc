export default function Normal({ theme, title, description, link }){
    return (
        <>
            <section className={`${theme} py-2`}>
                <div className="container">
                    <div className="center effect-left">
                        <h2 className="lg">{title}</h2>
                        {description && <p className="lead my-1">{description}</p>}
                        {link && <button onClick={() => window.open(link)} className={`button ${theme}-button`}>VISIT THE LINK</button>}
                    </div>
                </div>
            </section>
        </>
    )
}