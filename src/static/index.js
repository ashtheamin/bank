function renderLoginForm() {
    const loginForm = document.createElement("form");
    loginForm.setAttribute("method", "post");
    loginForm.setAttribute("action", "/recieveUserLoginForm");

    const userName = document.createElement("input");
    userName.setAttribute("type", "text");
    userName.setAttribute("name", "userName");
    userName.setAttribute("id", "userName");

    const submit = document.createElement("input");
    submit.setAttribute("type", "submit");

    loginForm.appendChild(userName);
    loginForm.appendChild(submit);
    document.getElementsByTagName("body")[0].appendChild(loginForm);
}

renderLoginForm();