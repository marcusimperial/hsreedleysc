import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import express from 'express';
import { verifySessionCookie } from './main/firebase.js';
import { getDeliveryFee, getPaymentFee, getOrderAmount, getOrderTotal, getProductName } from './store/operations.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const Router = express.Router();

Router.post('/orderinfo', async (req, res) => {
    const auth = await verifySessionCookie(req.cookies.session);
    if (!auth) return res.json({ status: false }); 
    const email = auth.email;
    const name = auth.name;
    const qty = req.body.qty;
    console.log(qty);
    const number = req.body.number;
    console.log(number);
    const address = req.body.address;
    console.log(address);

    const paymentType = req.body.paymentType;
    console.log(paymentType);
    const remarks = req.body.remarks;
    if (!qty || !number || !address || !paymentType) {
        console.log('error');
        return res.json({ status: false });
    } 
    const product = await getProductName();
    const orderAmount = await getOrderAmount(qty);
    console.log(orderAmount)
    const deliveryFee = await getDeliveryFee(address);
    if (!deliveryFee) {
        console.log('error');
        return res.json({ status: false }); 
    }
    const paymentFee = await getPaymentFee(paymentType, orderAmount, deliveryFee);
    const orderTotal = await getOrderTotal(orderAmount, deliveryFee, paymentFee);
    console.log(orderAmount, deliveryFee, orderTotal);
    console.log(orderTotal);
    let info = {
        email, name, qty, number, address, paymentType, product, orderAmount, deliveryFee, paymentFee, orderTotal
    }
    if (remarks) info.remarks = remarks;
    return res.json({ status: true, info }); 
})

export default Router;