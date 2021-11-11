export async function a(token) {
    try {
        const body = { token: token };
        const options = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body)
        };
        const response = await fetch('/auth', options);
        const data = await response.json();
        if(data.status) return true;
        else return false
    } catch {
        return false
    }
}

export async function b(token, levelandsection, strand) {
    try {
        const body = { data: { token, levelandsection, strand } };
        console.log(body);
        const options = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body)
        };
        const response = await fetch('/register', options);
        const data = await response.json();
        if(data.status) return true;
        else return false
    } catch {
        return false
    }
}

export async function registerUser(token, section, strand = '') {
    alert(`TOKEN: ${token} SECTION: ${section} STRAND: ${strand}`)
}