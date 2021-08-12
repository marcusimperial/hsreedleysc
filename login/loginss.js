//ONLOAD, BEFOREUNLOAD ADD;
window.onbeforeunload = () => {
    gapi.auth2.getAuthInstance().signOut()
}

window.onload = () => {
    gapi.auth2.getAuthInstance().signOut()
}

async function renderErr(msg){
    if(!msg) return;
    else {
        alert(`Error: ${msg}. Please try again.`);
        signOut();
        document.getElementById('auth').style.display = 'block'
    }
}
async function onSignIn(user) {
    if(document.readyState !== 'complete'){
        signOut();
        return;
    }
    const profile = user.getBasicProfile();
    const email = profile.getEmail();
    const token = user.getAuthResponse().id_token;
    document.getElementById('auth').style.display = 'none';
    if(email && email.includes('risfamily.com')){
        loader();
        const send = await sendToken(token);
        loader();
        if(send) location.reload(); //old user
        else {
            if(email.charAt(0) === 's'){
                sessionStorage.setItem('token', token);
                renderLevelAndSection();
            } else { //not a student account
                loader();
                const senduser = await sendData(token);
                loader();
                if(senduser) location.reload();
            }
        }
    } else renderErr('Please use an risfamily email')
}


async function signOut() {
    const auth2 = gapi.auth2.getAuthInstance();
    await auth2.signOut();
}

async function sendToken (token) {
    try {
        const body = { token: token };
        const options = {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(body)
        };
        const response = await fetch('/auth', options);
        const data = await response.json();
        console.log(data);
        if(data.status) return true;
        else return false
    } catch {
        return false
    }
}

async function sendData (token, levelandsection, strand) {
    try {
        const body = { data: [token, [levelandsection, strand]] };
        const options = {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(body)
        };
        const response = await fetch('/register', options);
        const data = await response.json();
        console.log(data);
        if(data.status) return true;
        else return false
    } catch {
        return false
    }
}
/* REGISTRATION */
async function updateState() {
    const lvlsec = document.getElementById('lvlsec');
    const strand = document.getElementById('strand');
    const submit = document.getElementById('submit');
    if(lvlsec){
        const lvlsecval = document.getElementById('lvlsecsel').value;
        if(lvlsecval){ //if level and section has  input
            sessionStorage.setItem('lvlsecval',lvlsecval);
            const checkshs = lvlsecval.includes(11) ||
            lvlsecval.includes(12);
            if(checkshs){ //if 11 or 12 is selected
                if(strand) { //if strand is initalized
                    const strandval = document.getElementById('strandsel').value;
                    console.log(strandval);
                    if(strandval) {
                        console.log(strandval)
                        sessionStorage.setItem('strandval',strandval);
                        if(!submit) renderButton();
                    } else {
                        if(submit) submit.remove();
                    }
                } else { //if strand is not initalized
                    renderStrand();
                    if(submit) submit.remove();
                }
            } else { //if 11 or 12 is not selected
                if(strand) strand.remove()
                if(!submit) renderButton()
            }
        } else {
            if(strand) strand.remove();
            if(submit) submit.remove();
        }
    } else {
        if(!lvlsec) renderLevelAndSection();
        if(strand) strand.remove();
        if(submit) submit.remove();
    }
}

async function deleteState() {
    const lvlsec = document.getElementById('lvlsec');
    const strand = document.getElementById('strand');
    const submit = document.getElementById('submit');
    if(lvlsec) lvlsec.remove();
    if(strand) strand.remove();
    if(submit) submit.remove();
}

async function renderLevelAndSection() {
    const values = ['7 Georgetown','7 Stanford','7 Berkeley',
    '8 Columbia','8 Cornell','8 Fordham',
    '9 Princeton','9 Harvard','9 Pepperdine',
    '10 Cambridge','10 Duke','10 Purdue',
    '11 Maya Angelou','11 Galileo',
    '12 Leonardo Da Vinci', '12 Marie Curie'];
    let div = document.createElement('div');
    div.id = 'lvlsec';
    div.className = 'seldivs';
    document.body.appendChild(div);
    let label = document.createElement('label');
    label.className = 'selheaders';
    label.innerHTML = 'Select your Level and Section:';
    div.appendChild(label);
    let line = document.createElement('br');
    div.appendChild(line);
    let select = document.createElement('select');
    select.addEventListener('change', updateState);
    select.id = 'lvlsecsel';
    select.className = 'sels';
    div.appendChild(select);
    let initial = document.createElement('option');
    initial.selected = true;
    initial.disabled = true;
    select.appendChild(initial);
    values.forEach(value => {
      let option = document.createElement('option');
      option.innerHTML = value;
      select.appendChild(option)
    })
}

async function renderStrand() {
    const values = ['GA','HUMSS','STEM','ABM'];
    let div = document.createElement('div');
    div.id = 'strand';
    div.className = 'seldivs';
    document.body.appendChild(div);
    let label = document.createElement('label');
    label.className = 'selheaders';
    label.innerHTML = 'Select your Strand:'
    div.appendChild(label);
    let line = document.createElement('br');
    div.appendChild(line);
    let select = document.createElement('select');
    select.id = 'strandsel';
    select.className = 'sels';
    select.addEventListener('change', updateState);
    div.appendChild(select);
    let initial = document.createElement('option');
    initial.selected = true;
    initial.disabled = true;
    select.appendChild(initial);
    values.forEach(value => {
      let option = document.createElement('option');
      option.innerHTML = value;
      select.appendChild(option)
    })
}

async function renderButton() {
    let div = document.createElement('div');
    div.id = 'submit';
    div.className = 'seldivs'
    document.body.appendChild(div);
    let button = document.createElement('button');
    button.className = 'submit';
    button.innerHTML = 'Complete';
    button.addEventListener('click', submitData);
    div.appendChild(button)
}

async function submitData() {
    const token = sessionStorage.getItem('token');
    const lvlsecval = sessionStorage.getItem('lvlsecval');
    const strandval = sessionStorage.getItem('strandval');
    if(token && lvlsecval){
        const checkshs = lvlsecval.includes(11) 
        || lvlsecval.includes(12);
        if(checkshs && strandval) {
            deleteState();
            loader();
            const send = await sendData(token,lvlsecval,strandval);
            loader();
            if(send) location.reload();
            else renderErr('An unexpected error occured')
        } else {
            deleteState();
            loader();
            const send = await sendData(token,lvlsecval);
            loader();
            if(send) location.reload();
            else renderErr('An unexpected error occured')
        }
    }
}

async function loader(){
    const loader = document.getElementById('loaderdiv');
    if(!loader) {
        let div = document.createElement('div');
        div.id = 'loaderdiv';
        document.body.appendChild(div);

        let div2 = document.createElement('div');
        div2.className = 'loader';
        div.appendChild(div2);

        let label = document.createElement('label');
        label.id = 'sublbl';
        label.innerHTML = 'Please wait a few seconds...'
        div.appendChild(label)
    } else loader.remove();
}