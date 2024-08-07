const authController = require('../controllers/authController');
const expenseController = require('../controllers/expenseController');

const routes = (app) => {
    // Authentication routes
    app.post('/register', authController.registerUser);
    app.post('/login', authController.loginUser);

    //Expenses routes
    app.post('/add-expense', expenseController.addExpense);
    app.get('/get-expense/:id', expenseController.getExpense); // Get single expense
    app.get('/all-expenses', expenseController.getAllExpenses); // Get all expenses
    app.put('/edit-expense/:id', expenseController.updateExpense);
    app.delete('/trash-expense/:id', expenseController.deleteExpense);
};

module.exports = routes;
