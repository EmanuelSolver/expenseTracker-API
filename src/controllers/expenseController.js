const db = require('../config/db');

exports.addExpense = (req, res) => {
    const { name, description, amount, date, user_id } = req.body;
    const query = 'INSERT INTO expenses (name, description, amount, date, user_id) VALUES (?, ?, ?, ?, ?)';

    db.query(query, [name, description, amount, date, user_id], (err, results) => {
        if (err) {
            console.error('Error adding expense:', err);
            return res.status(500).json({ message: 'Internal server error' });
        }
        res.status(201).json({ message: 'Expense added successfully' });
    });
};

exports.getExpense = (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM expenses WHERE id = ?';

    db.query(query, [id], (err, results) => {
        if (err) {
            console.error('Error fetching expense:', err);
            return res.status(500).json({ message: 'Internal server error' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Expense not found' });
        }
        res.status(200).json(results[0]);
    });
};

exports.getAllExpenses = (req, res) => {
    const query = 'SELECT * FROM expenses';

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching expenses:', err);
            return res.status(500).json({ message: 'Internal server error' });
        }
        res.status(200).json(results);
    });
};

exports.updateExpense = (req, res) => {
    const { id } = req.params;
    const { name, description, amount, date } = req.body;
    const query = 'UPDATE expenses SET name = ?, description = ?, amount = ?, date = ? WHERE id = ?';

    db.query(query, [description, amount, date, id], (err, results) => {
        if (err) {
            console.error('Error updating expense:', err);
            return res.status(500).json({ message: 'Internal server error' });
        }
        res.status(200).json({ message: 'Expense updated successfully' });
    });
};

exports.deleteExpense = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM expenses WHERE id = ?';

    db.query(query, [id], (err, results) => {
        if (err) {
            console.error('Error deleting expense:', err);
            return res.status(500).json({ message: 'Internal server error' });
        }
        res.status(200).json({ message: 'Expense deleted successfully' });
    });
};
