export const userLogIn = async (token) => {
    try {
        const body = { token };
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        };
        const response = await fetch('/login', options);
        const data = await response.json();
        if(data.status) return true;
        else return false;

    } catch {
        return false;
    }
}

export const userLogOut = async () => {
    try {
        const options = { method: 'POST' };
        const response = await fetch('/logout', options);
        await response.json();
        window.location.replace('/login')
    } catch (e) {
        console.log(e);
        window.location.reload();
    }
}

export const getPage = async (page) => {
    try {
        const body = { page };
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        };
        const response = await fetch('/page', options);
        const data = await response.json();
        if (data.status) return data.page;
        else window.location.reload();
    } catch (e) {
        console.log(e);
        return {};
    }
}

export const getPages = async () => {
    try {
        const options = { method: 'POST' };
        const response = await fetch('/pages', options);
        const data = await response.json();
        if (data.status) return data.pages;
        else window.location.reload();
    } catch (e) {
        console.log(e);
        return [];
    }
}

export const getPageList = async (page) => {
    try {
        const options = { method: 'POST' };
        const response = await fetch('/pagelist', options);
        const data = await response.json();
        if (data.status) return data.list;
        else window.location.reload();
    } catch (e) {
        console.log(e);
        return [];
    }
}

export const getPostsList = async (page) => {
    try {
        const options = { method: 'POST' };
        const response = await fetch('/postslist', options);
        const data = await response.json();
        if (data.status) return data.list;
        else window.location.reload();
    } catch (e) {
        console.log(e);
        return [];
    }
}