import { createRequire } from 'module';
import { initializeApp, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

const require = createRequire(import.meta.url);
const service = require('./firebase-service-account.json');

initializeApp({ credential: cert(service) });

const verifyToken = async (token) => {
    try {
        if (!token) return false;
        const decodedToken = await getAuth().verifyIdToken(token);
        if (decodedToken && decodedToken.email.split('@')[1] === 'risfamily.com') return decodedToken;
        else return false;
    } catch (e) {
        console.log(e);
        return false;
    }
}

export const generateCookie = async (token) => {
    try {
        const expiry = { expiresIn: 60 * 60 * 24 * 5 * 1000 };
        const decodedToken = await verifyToken(token);
        if (!decodedToken) return false;
        if (new Date().getTime() / 1000 - decodedToken.auth_time < 5 * 60)
        return { expiry, cookie: await getAuth().createSessionCookie(token, expiry) }
        else return false;
    } catch (e) {
        console.log(e);
        return false;
    }
}

export const verifySessionCookie = async (sessionCookie) => {
    try {
        if (!sessionCookie) return false;
        const checkCookie = await getAuth().verifySessionCookie(sessionCookie, true);
        if (checkCookie) return checkCookie;
        else return false;
    } catch (e) {
        console.log(e);
        return false;
    }
}

export const revokeSessionCookie = async (sessionCookie) => {
    try {
        const decodedClaims = await verifySessionCookie(sessionCookie);
        if (!decodedClaims) return false;
        const revokeToken = await getAuth().revokeRefreshTokens(decodedClaims.sub);
        if (revokeToken) return true;
        else return false;
    } catch (e) {
        console.log(e);
        return false;
    }
}