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
const token = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjFkMmE2YTZhNDcyYWNhNjNmM2FmNzU2NjIxZjM0Njg2OTI1YjUxYTgiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiTUFSQ1VTIFRJTU9USFkgSU1QRVJJQUwiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUFUWEFKenVZa2M5aThya2o0bnRkbk5XM1g3N21GSkZfS0ZqYTZ4VWhXclFCdz1zOTYtYyIsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS90aGUtc2Mtd2Vic2l0ZSIsImF1ZCI6InRoZS1zYy13ZWJzaXRlIiwiYXV0aF90aW1lIjoxNjQxMTI2NzQ5LCJ1c2VyX2lkIjoibzlKSjNKb2tTMmVYZ0xzVjlWMHJtSkFYd2U2MyIsInN1YiI6Im85SkozSm9rUzJlWGdMc1Y5VjBybUpBWHdlNjMiLCJpYXQiOjE2NDExMjY3NDksImV4cCI6MTY0MTEzMDM0OSwiZW1haWwiOiJzMTExMDI3QHJpc2ZhbWlseS5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJnb29nbGUuY29tIjpbIjEwOTM2MjI2ODQ0MzE4ODE0OTM3MCJdLCJlbWFpbCI6WyJzMTExMDI3QHJpc2ZhbWlseS5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJnb29nbGUuY29tIn19.DsxgQhq3fn_0fqY4eYe0Kfy3B1_ojtWLAJtATTheHm1dV53PGWem6e_6TM3qWQWFHIWkTLtZqGWlSdkIKxZRR7_OWlvVwDl6KB3Z3YUgxRQxxmHd7IWHltFeoxnwFyCiyWahbBW2GtZyNqjvY-20GlPU9eRUnp5ix0zMTnydaMKL9tTAQF0hb9Kyh8DOR6O9kPK8YVzKNu6CBKGHLGENJOY_zQthJSM6D1MJLP1hRmYY3xNB2ePNfJ1x_d6HZ38XLC6TvihLIRRgQvWaltlCp8fWzJqIGD55uTx2IGIgR_0EAZuvnheCBGoeds8JHyg2ued12-Cz2uOJ7GmQ9Nfb_w';
verifyToken(token).then(e => console.log(e));
export async function verifyToken(token) {

  try {
    const CLIENT_ID = '724396208046-99mu5n4aqdd3an263i279rgfefcpnbis.apps.googleusercontent.com';
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

  } catch (e) {
    console.log(e)
    return false
  }

}