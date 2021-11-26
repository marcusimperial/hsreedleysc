export async function signOut(){
    try {
        const options = {
            method: 'POST',
        };
        const response = await fetch('/signout', options);
        await response.json();
        window.location.reload();
    } catch {
        window.location.reload();
    }
  }