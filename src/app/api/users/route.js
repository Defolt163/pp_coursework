import pool from "../server";
import jwt from 'jsonwebtoken';
const SECRET_KEY = process.env.JWT_SECRET_KEY;
async function getUserFromToken(token) {
    const decoded = jwt.verify(token, SECRET_KEY);
    const userId = decoded.id;
    
    const [role] = await pool.query('SELECT UserRole FROM users WHERE UserId = ?', [userId]);
    if(role[0].UserRole === 'admin'){
        const [rows] = await pool.query('SELECT * FROM users');
        console.log('Результаты запроса в базу данных:', rows);
        return rows;
    }else{
        return new Response(JSON.stringify([]), { status: 200 });
    }
}

export async function GET(req) {
    const token = req.headers.get('authorization')?.split(' ')[1];

    if (!token) {
        console.log('Токен не предоставлен');
        return new Response(JSON.stringify({ message: 'Tокен не предоставлен' }), { status: 401 });
    }

    try {
        const user = await getUserFromToken(token);
        return new Response(JSON.stringify(user), { status: 200 });
    } catch (error) {
        console.error('Ошибка при получении пользователя:', error.message);
        return new Response(JSON.stringify({ message: error.message }), { status: 401 });
    }
}