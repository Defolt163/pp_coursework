import pool from "../../server";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET_KEY;

// Функция для получения заказов и их продуктов по токену
async function getUserFromToken(token) {
    console.log("Токен, который пришел на сервер:", token);

    // Декодируем токен
    const decoded = jwt.verify(token, SECRET_KEY);
    console.log("Декодированный токен:", decoded);

    const userId = decoded.id;
    // Получаем заказы пользователя
    const [rows] = await pool.query('SELECT o.OrderId, op.ProductId, op.ProductCount, op.ProductSize, p.ProductName, p.ProductPrice FROM orders AS o JOIN order_products AS op ON o.OrderId = op.OrderId JOIN products AS p ON op.ProductId = p.ProductId WHERE o.OrderId = 4', [userId])
    
    

    if (rows.length === 0) {
        return []; // Если заказов нет, возвращаем пустой массив
    }
    return rows
}

// Обработчик для получения данных
export async function GET(req) {
    const token = req.headers.get("authorization")?.split(" ")[1];

    if (!token) {
        console.log("Токен не предоставлен");
        return new Response(JSON.stringify({ message: "Токен не предоставлен" }), { status: 401 });
    }

    try {
        const userOrders = await getUserFromToken(token);
        return new Response(JSON.stringify(userOrders), { status: 200 });
    } catch (error) {
        console.error("Ошибка при получении пользователя:", error.message);
        return new Response(JSON.stringify({ message: "Ошибка сервера: " + error.message }), { status: 500 });
    }
}
