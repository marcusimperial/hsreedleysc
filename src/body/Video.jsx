export default function Video({ layout, theme, title, description, link, file }){
    return (
        <>
            <section className={`${theme} py-2`}>
                <div className={`container grid ${layout}`}>
                    { layout === 'video-layout-1' ? 
                    <div className="center effect-left">
                        <h2 className="lg">{title}</h2>
                        {description && <p className="lead my-1">{description}</p>}
                        {link && <button onClick={() => window.open(link)} className={`button ${theme}-button`}>VISIT THE LINK</button>}
                    </div> : 
                    <div className={`background ${theme}-background effect-left`}>
                        <video controls playsInLine controlsList="nodownload">
                            <source src={`https://storage.googleapis.com/scwebsitestatic/images/${file}`} type="video/mp4" />
                        </video>
                    </div> }
                    
                    { layout === 'video-layout-1' ? 
                    <div className={`background ${theme}-background effect-right`}>
                        <video controls playsInLine controlsList="nodownload">
                            <source src={`https://storage.googleapis.com/scwebsitestatic/images/${file}`} type="video/mp4" />
                        </video>
                    </div> :
                    <div className="center effect-right">
                        <h2 className="lg">{title}</h2>
                        {description && <p className="lead my-1">{description}</p>}
                        {link && <button onClick={() => window.open(link)} className={`button ${theme}-button`}>VISIT THE LINK</button>}
                    </div> }
                </div>
            </section>
        </>
    )
}