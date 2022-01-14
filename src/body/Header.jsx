export default function Header({ title, description }){
    return (
        <>
            <section className="light-theme-1 py-2">
                <div className="container">
                    <div className="center my-1">
                        <h1 className="xl">{title}</h1>
                        <h2 className="md my-1">{description}</h2>
                    </div>
                    <div className="border py-1"></div>
                </div>
            </section>
        </>
    )
}