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

async function createOrder(token, orderData) {
    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        const userId = decoded.id;

        // Вставка нового заказа в таблицу orders
        const [orderResult] = await pool.query('INSERT INTO orders (UserId, OrderDate, OrderStatus) VALUES (?, NOW(), ?)', [userId, 'Создан']);
        const orderId = orderResult.insertId;

        // Вставка продуктов в таблицу order_products
        const orderProducts = orderData.products.map(product => [orderId, product.productId, product.productCount, product.productSize]);
        await pool.query('INSERT INTO order_products (OrderId, ProductId, ProductCount, ProductSize) VALUES ?', [orderProducts]);
        await pool.query('DELETE FROM `cart` WHERE UserId = ?', userId)
        return { orderId, message: 'Order created successfully'};
    } catch (error) {
        throw new Error(`Error creating order: ${error.message}`);
    }
}

export async function POST(req) {
    const token = req.headers.get('authorization')?.split(' ')[1];
    const orderData = await req.json();

    if (!token) {
        return new Response(JSON.stringify({ message: 'Token not provided' }), { status: 401 });
    }

    try {
        const result = await createOrder(token, orderData);
        return new Response(JSON.stringify(result), { status: 201 });
    } catch (error) {
        console.error('Error creating order:', error.message);
        return new Response(JSON.stringify({ message: error.message }), { status: 500 });
    }
}