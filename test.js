import fetch from 'node-fetch';

async function getFile(token, fileId){
    try {
        if(!token) return false;
        const options = {
            method: 'GET',
            headers: { 
                'Authorization': `Bearer ${token}`
            },
        }
        const req = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}`, options);
        const res = await req.json();
        console.log(res);
        if(res.done) return true;
        else return false;
    } catch (e) {
        return false;
    }
}

getFile('ya29.A0ARrdaM-AHLRAWRIhCpN-4EWrCE28bVapkYet1RAcGFwd_5nymyKCw6yGEKFyhRnwBufc8NNj8TphCKR19Bxh9ewYKSrznaw6DxIIcCyPAfmYomLUMl1el2UQ4DNfdc8eDpWGTXGjGtxfxM_mswjH47-6dudo','1Yc4Z9aUmDAn2I3gj-21Zd4qEtYXXwi9SVgy3irJhIKo');