import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { Storage } from '@google-cloud/storage'
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const uploadFile = async (file) => { //STORAGE AND PATH LIBRARIES NEEDED
    try {
        const storage = new Storage ({
            keyFilename: path.join(__dirname, '/scwebsitestoragekey.json'),
            projectId: 'the-sc-website',
        });
        const bucket = storage.bucket("scwebsitestatic");
        const doc = bucket.file(`images/${file.name}`);
        await doc.save(file.data);
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}