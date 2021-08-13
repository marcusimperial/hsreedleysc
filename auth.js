
import { OAuth2Client } from 'google-auth-library';

async function verifyToken(token) {

  try {
    const CLIENT_ID = '724396208046-o906lfi8df45dovnlrf780ll1tc650l1.apps.googleusercontent.com';
    const client = new OAuth2Client(CLIENT_ID);
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const userid = payload.sub;
    const name = payload.name;
    const email = payload.email;
    const domain = payload.hd;

    console.log(userid);

    if(name && email && domain==='risfamily.com') return [userid, name, email];
    else throw new Error;

  } catch {
    console.log('err')
    return false
  }

}

export default {verifyToken}