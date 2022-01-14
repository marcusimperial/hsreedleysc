import { useEffect } from "react"

export default function Home(){

    useEffect(() => {
        import('./style.css');
    }, [])

    return (
        <>
            <div className="frontpage vertical-center">
                <div className="center my-1">
                    <h2 className="glow">THE OFFICIAL WEBSITE OF THE REEDLEY INTERNATIONAL SCHOOL HIGH SCHOOL</h2>
                    <h1 className="glow">STUDENT COUNCIL</h1>
                </div>
            </div>
        </>
    )
}