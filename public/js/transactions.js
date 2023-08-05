const myModal = new bootstrap.Modal("#transactionModal");
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");

let data = {
    transactions: []
};


document.getElementById("transactionModal").addEventListener("submit", function (e) {
    e.preventDefault();

    const value = parseFloat(document.getElementById("valueInput").value);
    const description = document.getElementById("descriptionInput").value;
    const date = document.getElementById("dateInput").value;
    const type = document.querySelector('input[name="typeInput"]:checked').value;

    data.transactions.unshift({
        value: value, type: type, description: description, date: date
    });

    saveData(data);
    e.target.reset();
    myModal.hide();

    getTransactions();

    alert("Transação adicionada com sucesso");

})



document.getElementById("logoutButton").addEventListener("click", logout)

checkLogged();

function checkLogged() {
    if (session) {
        sessionStorage.setItem("logged", session);
        logged = session;
    }

    if (!logged) {
        window.location.href = "login.html";
        return;
    }

    const dataUser = localStorage.getItem(logged);
    if (dataUser) {
        data = JSON.parse(dataUser);
    }


    getTransactions();
}

function logout() {
    sessionStorage.removeItem("logged");
    localStorage.removeItem("session");

    window.location.href = "login.html"
}

function getTransactions(){
    const transactions = data.transactions;
    let transactionsHtml = ``;

    if(transactions.length) {
        transactions.forEach((item) => {
            let type = "Entrada";

            if(item.type === "2") {
                type = "Saída";
            }

            transactionsHtml += `
            <tr>
                <th scope="row">${item.date}</th>
                <td>${item.value.toFixed(2)}</td>
                <td>${type}</td>
                <td>${item.description}</td>
            </tr>
            `
        })
    }

    document.getElementById("transactionsList").innerHTML = transactionsHtml;
}



function saveData(data) {
    localStorage.setItem(data.login, JSON.stringify(data));
}