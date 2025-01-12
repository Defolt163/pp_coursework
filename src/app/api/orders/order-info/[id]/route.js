import { NextResponse } from "next/server"
import pool from "../../../server";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET_KEY;

// Функция для получения заказов и их продуктов по токену
async function getUserFromToken(token, orderId) {
    console.log("Токен, который пришел на сервер:", token);

    // Декодируем токен
    const decoded = jwt.verify(token, SECRET_KEY);
    console.log("Декодированный токен:", decoded);

    const userId = decoded.id;

    // Получаем заказы пользователя с использованием orderId
    const [rows] = await pool.query(
        'SELECT o.OrderId, o.OrderStatus, op.ProductId, op.ProductCount, op.ProductSize, p.ProductName, p.ProductPrice, p.ProductImages FROM orders AS o JOIN order_products AS op ON o.OrderId = op.OrderId JOIN products AS p ON op.ProductId = p.ProductId WHERE o.OrderId = ? AND o.UserId = ?',
        [orderId, userId]
    );

    const total = rows.reduce((sum, item) => {
        return sum + (item.ProductPrice * item.ProductCount);
    }, 0)

    const products = rows.map(product => {
        const images = product.ProductImages.replace(/"/g, '').split(','); // Преобразуем строку в массив
        return {
            ...product,
            ProductImagesArray: images, // Добавляем массив изображений
        };
    });

    if (products.length === 0) {
        return []; // Если заказов нет, возвращаем пустой массив
    }

    return {
        orderId: rows[0].OrderId,
        orderStatus: rows[0].OrderStatus,
        total: total,
        items: products
    };
}

// Обработчик для получения данных
export async function GET(req, {params}) {
    const token = req.headers.get("authorization")?.split(" ")[1];

    if (!token) {
        console.log("Токен не предоставлен");
        return new Response(JSON.stringify({ message: "Токен не предоставлен" }), { status: 401 });
    }

    // Извлекаем параметры из URL
    const orderId = params.id;

    if (!orderId) {
        return new Response(JSON.stringify({ message: "OrderId не предоставлен" }), { status: 400 });
    }

    try {
        const userOrders = await getUserFromToken(token, orderId);
        return new Response(JSON.stringify(userOrders), { status: 200 });
    } catch (error) {
        console.error("Ошибка при получении пользователя:", error.message);
        return new Response(JSON.stringify({ message: "Ошибка сервера: " + error.message }), { status: 500 });
    }
}