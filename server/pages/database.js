import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;

const findPage = async (page) => {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const result = await client.db("riscouncil").collection("pages").findOne({ route: page });
        if (result) return result;
        else return {};   
    } catch {
        return {};
    } finally {
        await client.close();
    }
}

const queryDatabase = async (database, collection) => {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const result = await client.db(database).collection(collection).find().toArray();
        if (result) return result;
        else return [];   
    } catch {
        return [];
    } finally {
        await client.close();
    }
}

export const getPages = async () => {
    let pages = [];
    const pageQuery = await queryDatabase('riscouncil', 'pages');
    const postsQuery = await queryDatabase('riscouncil', 'posts');

    for (const data of pageQuery) {
        const posts = postsQuery.filter(post => post.route === data.route).reverse();
        pages.push({ data, posts })
    }
    return pages;
}

export const getPage = async (page) => {
    let posts = [];
    const data = await findPage(page);
    const postQuery = await queryDatabase('pages', page);
    for (const post of postQuery) posts.push(post);
    return { data, posts };
}

export const getPageList = async () => {
    let list = [];
    const pageQuery = await queryDatabase('riscouncil', 'pages');
    for (const data of pageQuery) list.push({ data })
    return list;
}

export const getPostsList = async () => {
    let list = [];
    const postsQuery = await queryDatabase('riscouncil', 'posts');
    for (const data of postsQuery) list.push(data);
    return list;
}