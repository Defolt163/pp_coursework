import { NextResponse } from 'next/server';
import pool from '../../server';
import jwt from 'jsonwebtoken';
const SECRET_KEY = process.env.JWT_SECRET_KEY;

// Получение информации о пользователе
export async function GET(req, { params }) {
    const token = req.headers.get('authorization')?.split(' ')[1];

    const decoded = jwt.verify(token, SECRET_KEY);
    const reqId = decoded.id;
    const [role] = await pool.query('SELECT UserRole FROM users WHERE UserId = ?', [reqId]);
    if (role[0].UserRole != 'admin') {
        console.log('Ошибка доступа');
        return new Response(JSON.stringify({ message: 'Ошибка доступа' }), { status: 401 });
    }


    try {
        const userId = (await params).id
        const [user] = await pool.query(
            "SELECT * FROM users WHERE UserId = ?",
            [userId]
          );
      
          // Запрос на данные о заказах
          const [orders] = await pool.query(
            `SELECT orders.OrderId, COUNT(order_products.ProductId) AS TotalItems, SUM(products.ProductPrice * order_products.ProductCount) AS TotalPrice, orders.OrderDate, orders.OrderStatus FROM orders JOIN order_products ON orders.OrderId = order_products.OrderId JOIN products ON order_products.ProductId = products.ProductId WHERE orders.UserId = ? GROUP BY orders.OrderId, orders.OrderDate, orders.OrderStatus;`,
            [userId]
          );
          const grandTotal = orders.reduce((sum, order) => sum + parseFloat(order.TotalPrice || 0), 0).toFixed(2);

          const responseData = {
            user: user[0],
            orders,
            grandTotal
          };
        return new Response(
            JSON.stringify(responseData),
            { status: 200, headers: { "Content-Type": "application/json" } }
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}