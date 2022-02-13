import { Storage } from '@google-cloud/storage'

export const uploadFile = async (file) => {
    try {
        const storage = new Storage (); // initialized using ADC
        const bucket = storage.bucket("scwebsitestatic");
        const doc = bucket.file(`images/${file.name}`);
        await doc.save(file.data);
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}