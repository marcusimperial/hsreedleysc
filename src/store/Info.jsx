import Address from './Address.jsx';
import { getOrderInfo } from './requests.js';
import { useState } from 'react';

export default function Info({ qty, setProduct, setLoader, setInfo }){

    const [number, setNumber] = useState("");
    const [address, setAddress] = useState("");
    const [remarks, setRemarks] = useState("");
    const [paymentType, setPaymentType] = useState("");

    const sendReq = async () => {
        let obj;
        if (number && address && paymentType && qty) obj = { number, address, paymentType, qty };
        else return alert('Please fill out all required fields.'); 
        if (remarks) obj.remarks = remarks;
        setLoader(true);
        const req = await getOrderInfo(obj);
        setLoader(false);
        if (req) setInfo(req);
        else alert('Action failed.');
    }

    return (
        <>
            <div className="container py-2">
                <div className="background my-1">
                    <h1 className="xl center">Delivery and Payment Information (1/2) </h1>
                    <div className="form my-1">
                        <h1 className="md">Contact Number</h1>
                        <input id="s" type="text" onChange={(e) => setNumber(e.target.value)}  />
                    </div>
                    <div className="form my-1">
                        <h1 className="md">Delivery Address</h1>
                        {address && <button onClick={() => setAddress('')}className="button sm">{address}</button>}
                        {!address && <Address address={address} setAddress={setAddress} />}
                    </div>
                    <div className="form my-1">
                        <h1 className="md">Delivery Instructions (if any)</h1>
                        <input id="s" type="text" onChange={(e) => setRemarks(e.target.value)}/>
                    </div>
                    <div className="form my-1">
                        <h1 className="md">Payment Type</h1>
                        <select onChange={(e) => setPaymentType(e.target.value)}>
                            <option value="">-</option>
                            <option value="card">Credit/Debit Card (3.5% plus PHP 15 Fee)</option>
                            <option value="gcash">GCash and GCredit (2.5% Fee)</option>
                            <option value="grabpay">GrabPay (2.2% Fee)</option>
                            <option value="paymaya">Paymaya (2.0% Fee)</option>
                            <option value="otc">OTC or Coins.ph (1.5% or PHP 10 Fee)</option>
                        </select>
                    </div>
                    <div>
                        <button onClick={() => setProduct(false)} className="button md">Go Back to Previous</button>
                        <button onClick={sendReq} className="button submit md">Proceed to Summary</button>
                    </div>
                </div>
            </div>
        </>
    )
}