let expenses = [];
let totalAmount = 0;

const categorySelect = document.getElementById('category-select');
const amountInput = document.getElementById('amount-input');
const dateInput = document.getElementById('date-input');
const addBtn = document.getElementById('add-btn');
const expensesTableBody = document.getElementById('expnese-table-body');
const totalAmountCell = document.getElementById('total-amount');

addBtn.addEventListener('click', function() {
    const category = categorySelect.value;
    const amount = Number(amountInput.value);
    const date = dateInput.value;
    const time = new Date().toLocaleTimeString();

    if (category === '') {
        alert('Please select a category');
        return;
    }
    if (isNaN(amount) || amount <=0 ) {
        alert('Please enter a valid amount');
        return;
    }
    if(date === '') {
        alert('Please select a date')
        return;
    }


    expenses.push({category, amount, date,time});

    totalAmount += amount;
    totalAmountCell.textContent = totalAmount;

    const newRow = expensesTableBody.insertRow();

    const categoryCell = newRow.insertCell();
    const amountCell = newRow.insertCell();
    const dateCell = newRow.insertCell();
    const timeCell = newRow.insertCell();
    const deleteCell = newRow.insertCell();
    const deleteBtn = document.createElement('button');

    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', function() {
        expenses.splice(expenses.indexOf(expense), 1);

        totalAmount -= expense.amount;
        totalAmountCell.textContent = totalAmount;

        expensesTableBody.removeChild(newRow);
    });

    const expense = expenses[expenses.length - 1];
    categoryCell.textContent = expense.category;
    amountCell.textContent = expense.amount;
    dateCell.textContent = expense.date;
    timeCell.textContent = expense.time;
    deleteCell.appendChild(deleteBtn);

});

for (const expense of expenses) {
    totalAmount += expense.amount;
    totalAmountCell.textContent = totalAmount;

    const newRow = expensesTableBody.inserRow();
    const categoryCell = newRow.insertCell();
    const amountCell = newRow.insertCell();
    const dateCell = newRow.insertCell();
    const deleteCell = newRow.insertCell();
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', function() {
        expenses.splice(expenses.indexOf(expense), 1);

        totalAmount -= expense.amount;
        totalAmountCell.textContent = totalAmount;

        expensesTableBody.removeChild(newRow);
    });
    categoryCell.textContent = expense.category;
    amountCell.textContent = expense.amount;
    dateCell.textContent = expense.date;
    deleteCell.appendChild(deleteBtn);
}

const addCustomCategoryModalBtn = document.getElementById('add-custom-category-modal-btn');
const customCategoryInput = document.getElementById('custom-category-input');
const addCustomCategoryModalSubmitBtn = document.getElementById('add-custom-category-modal-submit');

addCustomCategoryModalBtn.addEventListener('click', function() {
    $('#add-custom-category-modal').modal('show'); // Show the modal
});

addCustomCategoryModalSubmitBtn.addEventListener('click', function() {
    const customCategory = customCategoryInput.value.trim();

    if (customCategory === '') {
        alert('Please enter a custom category');
        return;
    }

    // Check if the category already exists
    if (categorySelect.querySelector(`option[value="${customCategory}"]`)) {
        alert('Category already exists');
        return;
    }

    // Add the custom category to the category dropdown
    const customCategoryOption = document.createElement('option');
    customCategoryOption.value = customCategory;
    customCategoryOption.textContent = customCategory;
    categorySelect.appendChild(customCategoryOption);

    // Clear the input field
    customCategoryInput.value = '';

    // Close the modal
    $('#add-custom-category-modal').modal('hide');
});
const categoryFilter = document.getElementById('category-filter');
const expenseTableBody = document.getElementById('expnese-table-body');

categoryFilter.addEventListener('change', function() {
    const selectedCategory = categoryFilter.value;
    
    if (selectedCategory === 'All') {
        displayExpenses(expenses);
    } else {
        const filteredExpenses = expenses.filter(expense => expense.category === selectedCategory);
        displayExpenses(filteredExpenses);
    }
});

function displayExpenses(filteredExpenses) {
    expenseTableBody.innerHTML = '';

    const displayExpenses = filteredExpenses.length ? filteredExpenses : expenses;

    displayExpenses.forEach(expense => {
        const newRow = expenseTableBody.insertRow();
        const categoryCell = newRow.insertCell();
        const amountCell = newRow.insertCell();
        const dateCell = newRow.insertCell();
        const timeCell = newRow.insertCell();
        const deleteCell = newRow.insertCell();

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete-btn');

        deleteBtn.addEventListener('click', function() {
            const index = expenses.indexOf(expense);
            if (index !== -1) {
                expenses.splice(index, 1);
                totalAmount -= expense.amount;
                totalAmountCell.textContent = totalAmount;
                expenseTableBody.removeChild(newRow);
            }
        });

        categoryCell.textContent = expense.category;
        amountCell.textContent = expense.amount;
        dateCell.textContent = expense.date;
        timeCell.textContent = expense.time;
        deleteCell.appendChild(deleteBtn);
    });

    updateTotal(displayExpenses);
}

function updateTotal(filteredExpenses) {
    const totalAmountCell = document.getElementById('total-amount');
    const total = filteredExpenses.reduce((acc, expense) => acc + expense.amount, 0);
    totalAmountCell.textContent = total;
}
