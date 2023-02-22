function renderLoginForm() {
    const loginForm = document.createElement('form');
    loginForm.setAttribute('method', 'post');
    loginForm.setAttribute('action', '/recieveUserLoginForm');
    loginForm.setAttribute('style', 'display: inline-block;')
    loginForm.addEventListener("submit", function() {
        console.log("Submitted")
        a = document.createElement("a")
        a.href = "/"
        a.click()
    })

    const header = document.createElement('h4');
    header.textContent = 'Login to Bank';

    const emailLabel = document.createElement('label');
    emailLabel.textContent = 'Email'
    const email = document.createElement('input');
    email.setAttribute('type', 'email');
    email.setAttribute('name', 'email');
    email.setAttribute('id', 'email');
    email.setAttribute('required', 'true');
    email.setAttribute('autocomplete', 'current-email')

    const passwordLabel = document.createElement('label');
    passwordLabel.textContent = 'Password';
    const password = document.createElement('input');
    password.setAttribute('type', 'password');
    password.setAttribute('name', 'password');
    password.setAttribute('id', 'password');
    password.setAttribute('required', 'true')
    password.setAttribute('autocomplete', 'current-password')

    const submit = document.createElement('input');
    submit.setAttribute('type', 'submit');
    submit.setAttribute('class', 'submit')

    const register = document.createElement('button');
    register.setAttribute('style', 'display: inline-block;')
    register.textContent = 'Register a new user'
    register.addEventListener('click', function() {
        localStorage.setItem('registrationRequested', 'true')
        location.reload()
    })
    
    loginForm.appendChild(header);
    loginForm.appendChild(emailLabel);
    loginForm.appendChild(email);
    loginForm.appendChild(passwordLabel);
    loginForm.appendChild(password);
    loginForm.appendChild(submit);

    document.getElementsByTagName('body')[0].appendChild(loginForm);
    document.getElementsByTagName('body')[0].appendChild(document.createElement('div'));

    if (getCookie('userNotFound') == 'true') {
        p = document.createElement("p");
        p.textContent = "User not found, or password is incorrect. Try again."
        document.getElementsByTagName('body')[0].appendChild(p);
    }
    document.getElementsByTagName('body')[0].appendChild(register);
}

function renderRegistrationForm() {
    const registrationForm = document.createElement('form');
    registrationForm.setAttribute('method', 'post');
    registrationForm.setAttribute('action', '/recieveUserRegistrationForm');
    registrationForm.setAttribute('style', 'display: inline-block;')

    const header = document.createElement('h4');
    header.textContent = 'Register to Bank';

    const nameLabel = document.createElement('label');
    nameLabel.textContent = 'Name'
    const name = document.createElement('input');
    name.setAttribute('type', 'text');
    name.setAttribute('name', 'name');
    name.setAttribute('id', 'name');
    name.setAttribute('required', 'true');
    name.setAttribute('autocomplete', 'current-name')

    const emailLabel = document.createElement('label');
    emailLabel.textContent = 'Email'
    const email = document.createElement('input');
    email.setAttribute('type', 'email');
    email.setAttribute('name', 'email');
    email.setAttribute('id', 'email');
    email.setAttribute('required', 'true');
    email.setAttribute('autocomplete', 'current-email')

    const passwordLabel1 = document.createElement('label');
    passwordLabel1.textContent = 'Password';
    const password1 = document.createElement('input');
    password1.setAttribute('type', 'password');
    password1.setAttribute('name', 'password1');
    password1.setAttribute('id', 'password1');
    password1.setAttribute('required', 'true')
    password1.setAttribute('autocomplete', 'current-password1')

    const submit = document.createElement('input');
    submit.setAttribute('type', 'submit');
    submit.setAttribute('class', 'submit')

    const returnToLogin = document.createElement('button');
    returnToLogin.textContent = 'Return To Login'
    returnToLogin.addEventListener('click', function() {
        localStorage.setItem('registrationRequested', 'false');
        location.reload()
    })
    
    
    registrationForm.appendChild(header);
    registrationForm.appendChild(nameLabel);
    registrationForm.appendChild(name);
    registrationForm.appendChild(emailLabel);
    registrationForm.appendChild(email);
    registrationForm.appendChild(passwordLabel1);
    registrationForm.appendChild(password1);
    registrationForm.appendChild(submit);

    document.getElementsByTagName('body')[0].appendChild(registrationForm);
    document.getElementsByTagName('body')[0].appendChild(document.createElement('div'));
    document.getElementsByTagName('body')[0].appendChild(returnToLogin);

    registrationForm.addEventListener('submit', function() {
        location.reload();
    })
}

function renderMainScreen() {
    var request = new XMLHttpRequest();
    request.open("GET", "/fetchUserInformationByToken", false);
    request.send(null);
    const userInformation = JSON.parse(request.responseText);

    const header = document.createElement("h2")
    header.textContent = `Welcome, ${userInformation['name']}`
    document.getElementsByTagName('body')[0].appendChild(header);
}

// Get cookie function from StackOverFlow by allenhwkim
// https://stackoverflow.com/a/49224652
function getCookie(name) {
    let cookie = {};
    document.cookie.split(';').forEach(function(el) {
      let [k,v] = el.split('=');
      cookie[k.trim()] = v;
    })
    return cookie[name];
}

async function validateToken() {
    await fetch('/recieveToken').then().then()
}

// Wait for the login token to be validated, then render UI.
// Indentation looks like this to emphasise 
// that this is a "main function" to avoid confusion.
validateToken().then( function() {
if (getCookie('jwtValid') != 'true') {
    if (localStorage.getItem('registrationRequested') != 'true') {
        renderLoginForm();
    }
    else {
        renderRegistrationForm();
    }
}

else {
    renderMainScreen();
}})