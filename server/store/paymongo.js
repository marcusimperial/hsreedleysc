import fetch from 'node-fetch';


const createIntent = async (orderTotal) => {
    try {
        const key = Buffer.from('sk_test_hf38RST7QgjpwPz8fsyepWAy').toString('base64');
        const body = {
            data: {
                attributes : {
                    amount: orderTotal * 1000,
                    payment_method_allowed: ['card', 'paymaya'],
                    currency: 'PHP'
                }
            }

        }
        const options = {
            method: 'POST',
            headers: {
                'Authorization': `Basic ${key}`,
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(body)
        }

        const res = await fetch('https://api.paymongo.com/v1/payment_intents', options);
        const data = await res.json();
        console.log(data);
    } catch (e) {
        console.log(e);
    }
}

const createSource = async () => {
    try {
        const key = Buffer.from('pk_test_XQVvp5QD86ohzbXo4eBA4teC').toString('base64');
        const body = {
            data: {
                attributes: {
                    amount: 10000, 
                    type: 'gcash', 
                    currency: 'PHP', 
                    redirect: {
                        success: 'http://localhost:3000/store',
                        failed: 'http://localhost:3000/store'
                    }
                }
            }
        }
        const options = {
            method: 'POST',
            headers: {
                Accept: 'application/json', 
                'Content-Type': 'application/json', 
                'Authorization': `Basic ${key}`
            },
            body: JSON.stringify(body)
        };
          
        const res = await fetch('https://api.paymongo.com/v1/sources', options)
        const data = await res.json();
        console.log(data.data.attributes.redirect);
    } catch (e) {
        console.log(e);
    }
}

const retrieveSource = async (id) => {
    try {
        const key = Buffer.from('pk_test_XQVvp5QD86ohzbXo4eBA4teC').toString('base64');
        const options = {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                Authorization: `Basic ${key}`
            }
        }
        const res = await fetch(`https://api.paymongo.com/v1/sources/${id}`, options);
        const data = await res.json();
        console.log(data);
    } catch (e) {
        console.log(e);
    }
}
createSource();