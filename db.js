import { MongoClient } from "mongodb";

async function parseUser(arr){
  const lvlsec = arr[0];
  const strand = arr[1];
  if(!lvlsec) return [''];
  if((lvlsec.includes(11) || lvlsec.includes(12))
  && strand) return ['shs', lvlsec, strand];
  else if (!(lvlsec.includes(11) || lvlsec.includes(12))) 
  return ['jhs',lvlsec];
  else return ['']
}

async function checkUser(userid){
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

async function addUser(authinfo, user){
  const uri = 'mongodb+srv://mainserver:1234@riscouncil.ah8x8.mongodb.net/riscouncil?retryWrites=true&w=majority';
  const client = new MongoClient(uri);
  try {

    await client.connect();
    const userinfo = await parseUser(user);
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


export default {addUser, checkUser}