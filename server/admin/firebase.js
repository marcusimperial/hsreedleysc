import { createRequire } from 'module';
import { initializeApp, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { findUser } from './database.js';

const require = createRequire(import.meta.url);
const service = require('../../firebase-service-account.json');

initializeApp({ credential: cert(service) });

export const adminVerifySessionCookie = async (sessionCookie) => {
    try {
        if (!sessionCookie) return false;
        const checkCookie = await getAuth().verifySessionCookie(sessionCookie, true);
        const verifyUser = await findUser(checkCookie.email);
        if (checkCookie && verifyUser) return checkCookie;
        else return false;
    } catch (e) {
        console.log(e);
        return false;
    }
}