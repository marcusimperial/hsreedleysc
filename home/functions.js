//to be added to the home page
async function signOut(){
    try {
        const options = {
            method: 'POST',
        };
        const response = await fetch('/signout', options);
        const data = await response.json();
        console.log(data.status);
        if(data.status) location.reload();
        else alert('An error occured. Please try again.')
    } catch {
        alert('An error occured. Please try again.')
    }
}