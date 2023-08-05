const myModal = new bootstrap.Modal("#registerModal");
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");

checkLogged();

//logar
document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const email = document.getElementById("emailLogin").value;
    const password = document.getElementById("passwordLogin").value;
    const checkSession = document.getElementById("sessionCheck").checked;

    const account = getAccount(email);

    if(!account) {
        alert("Verifique o usuário ou a senha.")
        return;
    }

    if(account) {
        if(account.password !== password){
            alert("Verifique o usuário ou a senha.")
            return;
        }

        saveSession(email, checkSession);
        



        window.location.href = "home.html";
    }

})


//criar conta
document.getElementById("createAccount").addEventListener("submit", function(e) {
    e.preventDefault();

    const email = document.getElementById("emailCreate").value;
    const password = document.getElementById("passwordCreate").value;

    if(email.length < 16){
        alert("Preencha o campo com um email válido")
        return;
    }

    if(password.length < 6){
        alert("Preencha a senha com ao menos 6 digitos.")
        return;
    }

    myModal.hide();

    saveAccount({
        login: email,
        password: password,
        transactions: []
    });

    alert("Conta criada com sucesso.");
});


function checkLogged() {
    if(session) {
        sessionStorage.setItem("logged", session);
        logged = session;
    }

    if(logged) {
        saveSession(logged, session);

        window.location.href = "home.html"; 
    }

}

function saveAccount(data) {
    localStorage.setItem(data.login, JSON.stringify(data));

}

function saveSession(data, saveSession) {
    if(saveSession) {
        localStorage.setItem("session", data);
    }


    sessionStorage.setItem("logged", data)
}



function getAccount(key) {
    const account = localStorage.getItem(key);

    if(account) {
        return JSON.parse(account)
    }

    return "";
}