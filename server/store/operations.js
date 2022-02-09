import fetch from 'node-fetch';

export const getProductName = async () => {
    return 'Reedley Merch Product'
}

export const getOrderTotal = async (orderAmount, deliveryFee, paymentFee) => {
    return orderAmount + deliveryFee + paymentFee
}

export const getOrderAmount = async (quantity) => {
    const itemPrice = 1000;
    return itemPrice * quantity;
}

export const getDeliveryFee = async (userAddress) => {
    try {
        const body = {
            matter: 'Stuffed Toy',
            points: [
                { address: 'Riverfront Residences, Doctor Sixto Antonio Avenue, Pasig, Metro Manila' },
                { address: userAddress }
            ]
        }
        const options = {
            method: 'POST',
            'Content-Type':'application/json',
            body: JSON.stringify(body),
            headers: {
                'X-DV-Auth-Token': '26B150106EEFB6A4E32FC8C6E92F7641305B9DA6'
            }
        }
        const res = await fetch('https://robotapitest.mrspeedy.ph/api/business/1.1/calculate-order', options);
        const data = await res.json();
        console.log(data);
        console.log(data.payment_amount);
        if (data && data.is_successful) return parseInt(data.order.payment_amount);
        else return false;

    } catch (e) {
        console.log(e);
        return false;
    }
}

export const getPaymentFee = async (paymentType, orderAmount, deliveryFee) => {
    const amountWouldBePaid = orderAmount + deliveryFee;
    let pricing = { fixed: 0, percentage: 0 };

    switch (paymentType) {
        case 'gcash': 
            pricing.percentage = 0.025;
            break;
        case 'grabpay':
            pricing.percentage = 0.022;
            break;
        case 'paymaya':
            pricing.percentage = 0.02;
            break;
        case 'otc':
            if ((amountWouldBePaid * 0.015) < 10) pricing.fixed = 10;
            else pricing.percentage = 0.015;
            break;
        default: 
            pricing.fixed = 15;
            pricing.percentage = 0.035;
    }

    const paymentFee = Math.ceil(((pricing.percentage * amountWouldBePaid) + pricing.fixed) / (1 - pricing.percentage));
    return paymentFee
}