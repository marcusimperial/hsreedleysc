import { MongoClient } from 'mongodb';
const uri = process.env.MONGODB_URI;

export const addPage = async (title, description, route, type) => {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const data = await client.db("riscouncil").collection("pages").insertOne({ title, description, route, type });
        const storage = await client.db("pages").createCollection(route);
        if(data && storage) return true;
        else return false;       
    } catch (e){
        console.log(e);
        return false;
    } finally {
        await client.close();
    }
}

export const addPost = async (uploadPage, obj) => {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const result1 = await client.db("riscouncil").collection("posts").insertOne(obj);
        const result2 = await client.db("pages").collection(uploadPage).insertOne(obj);
        if(result1 && result2) return true;
        else return false;       
    } catch (e){
        console.log(e);
        return false;
    } finally {
        await client.close();
    }
}


export const findUser = async (email) => {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const result = await client.db("riscouncil").collection("authusers").findOne({ email });
        if (result) return result;
        else return false;   
    } catch {
        return false;
    } finally {
        await client.close();
    }
}