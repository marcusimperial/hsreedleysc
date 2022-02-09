export default function Payment({ info = {} , setInfo, setPayment }){

    const sendReq = {

    }
    console.log(info);

    return (
        <>
            <div className="container py-2">
                <div className="center background my-1">
                    <h1 className="xl">Review your Order (2/2)</h1>
                    <div className="form my-1">
                        <h1 className="lg">Information Summary</h1>
                        <h1 className="md">{`Full Name: ${info.name}`}</h1>
                        <h1 className="md">{`Product: ${info.product}`}</h1>
                        <h1 className="md">{`Quantity: ${info.qty}`}</h1>
                        <h1 className="md">{`Email Address: ${info.email}`}</h1>
                        <h1 className="md">{`Contact Number: ${info.number}`}</h1>
                        <h1 className="md">{`Delivery Address: ${info.address}`}</h1>
                        <h1 className="md">{`Delivery Instructions: ${info.remarks}`}</h1>
                        <h1 className="md">{`Payment Type: ${info.paymentType}`}</h1>
                    </div>
                    <div className="form my-1">
                        <h1 className="lg">Payment Summary</h1>
                        <h1 className="md">{`Order Amount: PHP ${info.orderAmount}`}</h1>
                        <h1 className="md">{`Delivery Fee: PHP ${info.deliveryFee}`}</h1>
                        <h1 className="md">{`Payment Fee: PHP ${info.paymentFee}`}</h1>
                        <h1 className="lg">{`Your Order Total: PHP ${info.orderTotal}`}</h1>
                    </div>
                    <div>
                        <button onClick={() => setInfo(false)} className="button md">Go Back to Previous</button>
                        <button onClick={sendReq} className="button submit md">Proceed to Payment</button>
                    </div>
                </div>
            </div>
        </>
    )


}