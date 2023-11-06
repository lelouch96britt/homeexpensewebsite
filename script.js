$(document).ready(function() {
    let expenses = [];
    let totalAmount = 0;

    const categorySelect = $('#category-select');
    const amountInput = $('#amount-input');
    const dateInput = $('#date-input');
    const addBtn = $('#add-btn');
    const expensesTableBody = $('#expnese-table-body');
    const totalAmountCell = $('#total-amount');

    addBtn.on('click', function() {
        const category = categorySelect.val();
        const amount = Number(amountInput.val());
        const date = dateInput.val();
        const time = new Date().toLocaleTimeString();

        if (category === '') {
            alert('Please select a category');
            return;
        }
        if (isNaN(amount) || amount <= 0) {
            alert('Please enter a valid amount');
            return;
        }
        if (date === '') {
            alert('Please select a date');
            return;
        }

        expenses.push({ category, amount, date, time });

        totalAmount += amount;
        totalAmountCell.text(totalAmount);

        const newRow = $('<tr></tr>');

        newRow.append('<td>' + category + '</td>');
        newRow.append('<td>' + amount + '</td>');
        newRow.append('<td>' + date + '</td>');
        newRow.append('<td>' + time + '</td>');

        const deleteCell = $('<td></td>');
        const deleteBtn = $('<button class="delete-btn">Delete</button');

        deleteBtn.on('click', function() {
            const index = expenses.findIndex(expense => expense.category === category && expense.amount === amount && expense.date === date && expense.time === time);
            if (index !== -1) {
                expenses.splice(index, 1);
                totalAmount -= amount;
                totalAmountCell.text(totalAmount);
                newRow.remove();
            }
        });

        deleteCell.append(deleteBtn);
        newRow.append(deleteCell);
        expensesTableBody.append(newRow);
    });

    // Handle the modal for adding custom categories
    const addCustomCategoryModalBtn = $('#add-custom-category-modal-btn');
    const customCategoryInput = $('#custom-category-input');
    const addCustomCategoryModalSubmitBtn = $('#add-custom-category-modal-submit');

    addCustomCategoryModalBtn.on('click', function() {
        $('#add-custom-category-modal').modal('show');
    });

    addCustomCategoryModalSubmitBtn.on('click', function() {
        const customCategory = customCategoryInput.val().trim();

        if (customCategory === '') {
            alert('Please enter a custom category');
            return;
        }

        // Check if the category already exists
        if (categorySelect.find(`option[value="${customCategory}"]`).length > 0) {
            alert('Category already exists');
            return;
        }

        // Add the custom category to the category dropdown
        categorySelect.append($('<option>', {
            value: customCategory,
            text: customCategory
        }));

        // Clear the input field
        customCategoryInput.val('');

        // Close the modal
        $('#add-custom-category-modal').modal('hide');
    });
    const categoryFilter = $('#category-filter');
    const expenseTableBody = $('#expnese-table-body');

    categoryFilter.on('change', function() {
        const selectedCategory = categoryFilter.val();
        
        if (selectedCategory === 'All') {
            displayExpenses(expenses);
        } else {
            const filteredExpenses = expenses.filter(expense => expense.category === selectedCategory);
            displayExpenses(filteredExpenses);
        }
    });

    function displayExpenses(filteredExpenses) {
        expenseTableBody.empty();

        const displayExpenses = filteredExpenses.length ? filteredExpenses : expenses;

        displayExpenses.forEach(expense => {
            const newRow = $('<tr></tr>');
            const categoryCell = $('<td>' + expense.category + '</td>');
            const amountCell = $('<td>' + expense.amount + '</td>');
            const dateCell = $('<td>' + expense.date + '</td>');
            const timeCell = $('<td>' + expense.time + '</td>');
            const deleteCell = $('<td></td>');

            const deleteBtn = $('<button class="delete-btn">Delete</button>');

            deleteBtn.on('click', function() {
                const index = expenses.indexOf(expense);
                if (index !== -1) {
                    expenses.splice(index, 1);
                    totalAmount -= expense.amount;
                    totalAmountCell.text(totalAmount);
                    newRow.remove();
                }
            });

            deleteCell.append(deleteBtn);
            newRow.append(categoryCell);
            newRow.append(amountCell);
            newRow.append(dateCell);
            newRow.append(timeCell);
            newRow.append(deleteCell);
            expenseTableBody.append(newRow);
        });

        updateTotal(displayExpenses);
    }

    function updateTotal(filteredExpenses) {
        const totalAmountCell = $('#total-amount');
        const total = filteredExpenses.reduce((acc, expense) => acc + expense.amount, 0);
        totalAmountCell.text(total);
    }
});
