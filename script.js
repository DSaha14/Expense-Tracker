const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const incomeText = document.getElementById('income-text');
const expenseText = document.getElementById('expense-text');

const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));

let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

function addTransaction(e) {
    e.preventDefault();

    if (incomeText.value.trim() !== "") {
        const incomeTransaction = {
            id: generateID(),
            text: 'Income',
            amount: +incomeText.value
        };
        transactions.push(incomeTransaction);
        addTransactionDOM(incomeTransaction);
    }

    if (expenseText.value.trim() !== "") {
        const expenseTransaction = {
            id: generateID(),
            text: 'Expense',
            amount: -expenseText.value
        };
        transactions.push(expenseTransaction);
        addTransactionDOM(expenseTransaction);
    }

    updateValues();
    updateLocalStorage();

    incomeText.value = "";
    expenseText.value = "";
    text.value = "";
}

function generateID() {
    return Math.floor(Math.random() * 100000000);
}

function addTransactionDOM(transaction) {
    const sign = transaction.amount < 0 ? '-' : '+';
    const item = document.createElement('li');
    item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

    item.innerHTML = `
        ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span>
        <button class="delete-btn" onClick="removeTransaction(${transaction.id})">x</button>
    `;
    list.appendChild(item);
}

function updateValues() {
    const amounts = transactions.map(transaction => transaction.amount);

    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
    const income = amounts.filter(item => item > 0).reduce((acc, item) => (acc += item), 0).toFixed(2);
    const expense = amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0).toFixed(2);

    balance.innerText = $${total};
    money_plus.innerText = $${income};
    money_minus.innerText = $${Math.abs(expense)};
}

function removeTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);

    updateLocalStorage();
    init();
}

function updateLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

function init() {
    list.innerHTML = '';
    transactions.forEach(addTransactionDOM);
    updateValues();
}

init();

form.addEventListener('submit', addTransaction);