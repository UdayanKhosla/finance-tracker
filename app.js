// Get form elements
const form = document.getElementById('transaction-form');
const transactionList = document.getElementById('transaction-list');
const totalIncomeEl = document.getElementById('total-income');
const totalExpenseEl = document.getElementById('total-expense');
const balanceEl = document.getElementById('balance');

// State to hold transactions
let transactions = [];

// Handle form submission
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const description = document.getElementById('description').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const type = document.getElementById('type').value;

    const transaction = { description, amount, type };
    transactions.push(transaction);

    updateUI();
    form.reset();
});

// Update the UI
function updateUI() {
    let income = 0;
    let expense = 0;

    // Clear existing transactions
    transactionList.innerHTML = '';

    // Loop through transactions
    transactions.forEach(transaction => {
        const row = document.createElement('tr');

        const descriptionCell = document.createElement('td');
        descriptionCell.textContent = transaction.description;
        row.appendChild(descriptionCell);

        const amountCell = document.createElement('td');
        amountCell.textContent = `₹${transaction.amount.toFixed(2)}`; // Show amounts in INR
        
        // Change color based on type
        if (transaction.type === 'income') {
            amountCell.style.color = 'green';
        } else {
            amountCell.style.color = 'red';
        }

        row.appendChild(amountCell);
        transactionList.appendChild(row);

        // Calculate total income and expenses
        if (transaction.type === 'income') {
            income += transaction.amount;
        } else {
            expense += transaction.amount;
        }
    });

    // Update totals
    totalIncomeEl.textContent = `₹${income.toFixed(2)}`; // Update total income display
    totalExpenseEl.textContent = `₹${expense.toFixed(2)}`; // Update total expense display
    balanceEl.textContent = `₹${(income - expense).toFixed(2)}`; // Update balance display
}
