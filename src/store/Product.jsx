import { useState } from "react"

export default function Product({ setProduct }){

    const [qty, setQty] = useState(1);

    return (
        <>
            <section className={`container py-2`}>
                <div className={`grid background my-1`}>
                    <img src={`https://cdn.idyle.io/bowstrike.jpeg`} alt={`reedleymerch`} />
                    <div>
                        <h1 className="lg">Reedley Merch Product</h1>
                        <h2 className="lead">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec ipsum convallis, auctor tellus id, tristique est. Suspendisse maximus ante eget nunc iaculis pharetra. Vivamus imperdiet risus id diam accumsan, eu tincidunt arcu viverra. Maecenas vitae ultricies neque. Nullam vulputate sollicitudin nisi, sed euismod ligula tincidunt nec. Donec at tempus.</h2>
                        <div className="qty">
                            <h1 className="lead">Select Quanttiy</h1>
                            <button className="button" onClick={() => setQty(qty < 30 ? qty+1 : qty)}>+</button>
                            <h1 className="lead">{qty}</h1>
                            <button className="button "onClick={() => setQty(qty > 1 ? qty-1 : qty)}>-</button>
                        </div>
                        <button className="button md my-1" onClick={() => setProduct(qty)}>Buy Now</button>
                    </div>
                </div>
            </section>
        </>
    )


}