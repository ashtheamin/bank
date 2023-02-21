function renderLoginForm() {
    const loginForm = document.createElement("form");
    loginForm.setAttribute("method", "post");
    loginForm.setAttribute("action", "/recieveUserLoginForm");
    loginForm.setAttribute("style", "display: inline-block;")

    const header = document.createElement("h4");
    header.textContent = "Login to Bank";

    const emailLabel = document.createElement("label");
    emailLabel.textContent = "Email"
    const email = document.createElement("input");
    email.setAttribute("type", "text");
    email.setAttribute("name", "email");
    email.setAttribute("id", "email");
    email.setAttribute("required", "true");
    email.setAttribute("autocomplete", "current-email")

    const passwordLabel = document.createElement("label");
    passwordLabel.textContent = "Password";
    const password = document.createElement("input");
    password.setAttribute("type", "password");
    password.setAttribute("name", "password");
    password.setAttribute("id", "password");
    password.setAttribute("required", "true")
    password.setAttribute("autocomplete", "current-password")

    const submit = document.createElement("input");
    submit.setAttribute("type", "submit");
    submit.setAttribute("class", "submit")

    loginForm.appendChild(header);
    loginForm.appendChild(emailLabel);
    loginForm.appendChild(email);
    loginForm.appendChild(passwordLabel);
    loginForm.appendChild(password);
    loginForm.appendChild(submit);
    document.getElementsByTagName("body")[0].appendChild(loginForm);
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

renderLoginForm();

fetch("/recieveToken").then(
    response => response.text()).then(text => console.log(text))

console.log(getCookie('jwtValid'));