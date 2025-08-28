const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');

const app = express();
const PORT = 3000;

const db = new sqlite3.Database('difa.db');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Rota de registro
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], function(err) {
        if (err) {
            console.error(err);
            return res.status(400).send('Erro ao cadastrar usuário.');
        }
        res.redirect('/login.html');
    });
});

// Rota de login
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    db.get('SELECT * FROM users WHERE username = ?', [username], async (err, row) => {
        if (err || !row) {
            return res.status(400).send('Usuário ou senha incorretos.');
        }
        const match = await bcrypt.compare(password, row.password);
        if (match) {
            res.redirect('/dashboard.html');
        } else {
            res.status(400).send('Usuário ou senha incorretos.');
        }
    });
});

// Rota para agendar um horário
app.post('/agendar', (req, res) => {
    const { name, date, subject } = req.body;
    db.run('INSERT INTO appointments (name, date, description) VALUES (?, ?, ?)', [name, date, subject], function(err) {
        if (err) {
            console.error(err);
            return res.status(500).send('Erro ao agendar horário.');
        }
        res.send('Horário agendado com sucesso!');
    });
});

// Rota para buscar agendamentos
app.get('/get_appointments', (req, res) => {
    const { date } = req.query;
    db.all('SELECT name, date, description FROM appointments WHERE date LIKE ?', [`%${date}%`], (err, rows) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Erro ao buscar agendamentos.');
        }
        res.json(rows);
    });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
