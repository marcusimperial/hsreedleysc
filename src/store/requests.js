export const getOrderInfo = async (obj) => {
    try {
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(obj)
        };
        const response = await fetch('/orderinfo', options);
        const data = await response.json();
        if (data.status) return data.info;
        else return false;
    } catch (e) {
        console.log(e);
        return false;
    }

}