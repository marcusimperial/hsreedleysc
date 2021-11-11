export async function signOut() {
    const auth2 = gapi.auth2.getAuthInstance();
    await auth2.signOut();
}

export async function onSignIn(user) {
    const token = user.getAuthResponse().id_token;
    setToken(token);
}