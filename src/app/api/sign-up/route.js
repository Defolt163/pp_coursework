import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import pool from '../server';

const SECRET_KEY = process.env.JWT_SECRET_KEY;

export async function POST(req) {
    try {
        const { name, email, password } = await req.json();

        // Проверка, существует ли пользователь
        const [rows] = await pool.query('SELECT * FROM users WHERE UserEmail = ?', [email]);

        if (rows.length > 0) {
            return new Response(
                JSON.stringify({ message: 'Пользователь уже существует' }),
                { status: 400 }
            );
        } else {
            // Сохранение пользователя в базе данных
            const hashedPassword = await bcrypt.hash(password, 10)
            await pool.query(
                'INSERT INTO users (UserEmail, UserPassword, UserName) VALUES (?, ?, ?)',
                [email, hashedPassword, name]
            );

            // Получение сохраненного пользователя
            const [newRows] = await pool.query('SELECT * FROM users WHERE UserEmail = ?', [email]);
            const user = newRows[0];

            // Генерация токена
            const token = jwt.sign(
                {
                    id: user.UserId,
                    name: user.UserName,
                    email: user.UserEmail,
                    role: user.UserRole,
                },
                SECRET_KEY,
                { expiresIn: '7d' }
            );

            console.log('Сгенерирован токен:', token);

            return new Response(
                JSON.stringify({ message: 'Готово', token }),
                { status: 201 }
            );
        }
    } catch (err) {
        console.error('Ошибка регистрации:', err);
        return new Response(
            JSON.stringify({ message: 'Ошибка' }),
            { status: 500 }
        );
    }
}
