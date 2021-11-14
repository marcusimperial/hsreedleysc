import { MongoClient } from "mongodb";

async function parseUser(section, strand){
  if(!section) return [''];
  if((section.includes(11) || section.includes(12))
  && strand) return ['shs', section, strand];
  else if (!(section.includes(11) || section.includes(12))) 
  return ['jhs',section];
  else return ['']
}

export async function checkUser(userid){
  const uri = 'mongodb+srv://mainserver:1234@riscouncil.ah8x8.mongodb.net/riscouncil?retryWrites=true&w=majority';
  const client = new MongoClient(uri);
  try {
    console.log('ok');
    await client.connect();
    const result = await client.db("riscouncil").collection("users").findOne({
      userid: userid});
      console.log(result)
      if(result) return true;
      else return false;

     
  } catch {
    return false;
  } finally {
    await client.close();
  }
}

export async function addUser(authinfo, section, strand){
  const uri = 'mongodb+srv://mainserver:1234@riscouncil.ah8x8.mongodb.net/riscouncil?retryWrites=true&w=majority';
  const client = new MongoClient(uri);
  try {

    await client.connect();
    const userinfo = await parseUser(section, strand);
    const userid = authinfo[0];
    const name = authinfo[1];
    const email = authinfo[2];
    const type = userinfo[0];
    let datatosend = '';
    if(email.charAt(0) === 's'){ //if the user is a student 
      if(type === 'shs'){ //if the user is from senior high 
        datatosend = {
          userid: userid,
          name: name,
          levelandsection: userinfo[1],
          strand: userinfo[2]
        }
      } else if (type === 'jhs') { //if the user is from junior high 
        datatosend = {
          userid: userid,
          name: name,
          levelandsection: userinfo[1],
        }
      } else return false
    } else { //if the user is not a student 
      datatosend = {
        userid: userid,
        name: name
      }
    }
    const result = await client.db("riscouncil").collection("users").insertOne(datatosend);
    console.log(result);
    if(result) return true;
    else return false;
  } catch (err) {
    console.log(err)
    return false
  } finally {
    await client.close()
  }

}

import { OAuth2Client } from 'google-auth-library';

export async function verifyToken(token) {

  try {
    const CLIENT_ID = '724396208046-174g1j7ib3vhl3foa80j0sd4hvtcv3p9.apps.googleusercontent.com';
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