import { useState, useEffect } from 'react';
import Loader from './Loader.jsx';
import Product from './Product.jsx';
import Info from './Info.jsx';
import Payment from './Payment.jsx';

export default function Admin(){

    useEffect(() => {
        import('./utils.css');
        import('./sizes.css');
        document.title = 'Admin'
    }, []);

    const [loader, setLoader] = useState(false);

    const [product, setProduct] = useState(false);
    const [info, setInfo] = useState(false);
    const [payment, setPayment] = useState(false);


    return (
        <>
            {(product && info && !loader) && <Payment info={info} setInfo={setInfo} />}
            {(product && !info && !loader) && <Info qty={product} setLoader={setLoader} setProduct={setProduct} setInfo={setInfo}/>}
            {(!product && !loader) && <Product setProduct={setProduct} />}
            {loader && <Loader />}


        </>
    )
}