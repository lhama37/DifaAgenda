const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('difa.db');

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY,
            username TEXT UNIQUE,
            password TEXT
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS appointments (
            id INTEGER PRIMARY KEY,
            user_id INTEGER,
            title TEXT,
            date TEXT,
            time TEXT,
            FOREIGN KEY (user_id) REFERENCES users(id)
        )
    `);
});

db.close();
console.log('Banco de dados e tabelas criadas com sucesso!');
