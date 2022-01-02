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
        alert(data.status);
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