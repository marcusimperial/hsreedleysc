export const createPage = async (title, description, route, type) => {
    try {
        const body = { title, description, route, type };
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        };
        const response = await fetch('/create', options);
        const data = await response.json();
        if (data.status) return true;
        else return false;
    } catch (e) {
        console.log(e);
        return false;
    }
}

export const addPost = async (obj) => {
    try {
        const formData = new FormData();
        for (const [key, value] of Object.entries(obj)) formData.append(key, value);
        const response = await fetch('/add', { method: "POST", body: formData });
        const data = await response.json();
        if(data.status) return true;
        else return false;
    } catch (e) {
        console.log(e);
        return false;
    }
}