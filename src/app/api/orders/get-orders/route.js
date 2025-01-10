import pool from "../../server";
import jwt from 'jsonwebtoken';
const SECRET_KEY = process.env.JWT_SECRET_KEY;
async function getUserFromToken(token) {
    console.log('Токен, который пришел на сервер:', token);

    const decoded = jwt.verify(token, SECRET_KEY);
    console.log('Декодированный токен:', decoded);

    const userId = decoded.id;

    const [rows] = await pool.query('SELECT orders.OrderId, COUNT(order_products.ProductId) AS TotalItems, SUM(products.ProductPrice * order_products.ProductCount) AS TotalPrice, orders.OrderDate, orders.OrderStatus FROM orders JOIN order_products ON orders.OrderId = order_products.OrderId JOIN products ON order_products.ProductId = products.ProductId JOIN users ON orders.UserId = users.UserId WHERE users.UserId = ? GROUP BY orders.OrderId, orders.OrderDate, orders.OrderStatus', [userId]);
    console.log('Результаты запроса в базу данных:', rows);

    if (rows.length === 0) {
        return new Response(JSON.stringify([]), { status: 200 });
    }

    return rows; // Возвращаем данные пользователя
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