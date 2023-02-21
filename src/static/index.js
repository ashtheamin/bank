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
    email.setAttribute("autocomplete", "current-email")

    const passwordLabel = document.createElement("label");
    passwordLabel.textContent = "Password";
    const password = document.createElement("input");
    password.setAttribute("type", "password");
    password.setAttribute("name", "password");
    password.setAttribute("id", "password");
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

    loginForm.addEventListener("submit", function(event) {
        console.log("Hi");
        fetch("/setBrowserLoginCookie").then(
            response => response.text()).then(text => console.log(text))
    })
}

renderLoginForm();

console.log(document.cookie)
