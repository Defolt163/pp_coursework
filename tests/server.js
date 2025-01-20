import mysql from 'mysql2/promise';

// Получение данных из файла окружения
const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

// Создание пула подключений
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'kp',
  connectionLimit: 6, // Максимальное количество соединений
});

export default pool;
