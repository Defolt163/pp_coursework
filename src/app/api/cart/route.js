import pool from "../server";
import jwt from 'jsonwebtoken';
const SECRET_KEY = process.env.JWT_SECRET_KEY;
async function getCart(token) {
    console.log('Токен, который пришел на сервер:', token);

    const decoded = jwt.verify(token, SECRET_KEY);
    console.log('Декодированный токен:', decoded);

    const userId = decoded.id;

    const [rows] = await pool.query('SELECT c.ProductId, p.ProductName, p.ProductImages, c.ProductCount, c.ProductSize, p.ProductPrice, (p.ProductPrice * c.ProductCount) AS TotalPricePerItem, SUM(p.ProductPrice * c.ProductCount) OVER() AS TotalCartPrice FROM cart AS c JOIN products AS p ON c.ProductId = p.ProductId WHERE c.UserId = ?', [userId]);
    const products = rows.map(product => {
        const images = product.ProductImages.replace(/"/g, '').split(','); // Преобразуем строку в массив
        return {
            ...product,
            ProductImagesArray: images, // Добавляем массив изображений
        };
    });
    console.log('Результаты запроса в базу данных:', rows);

    if (rows.length === 0) {
        return new Response(JSON.stringify([]), { status: 200 });
    }

    return products; // Возвращаем данные пользователя
}
async function deleteCartItem(token, productId) {
    try {
        console.log("Токен, который пришел на сервер:", token);

        // Расшифровка токена
        const decoded = jwt.verify(token, SECRET_KEY);
        console.log("Декодированный токен:", decoded);

        const userId = decoded.id;

        // Удаляем позицию из корзины
        const [result] = await pool.query(
            "DELETE FROM cart WHERE UserId = ? AND ProductId = ?",
            [userId, productId]
        );

        if (result.affectedRows === 0) {
            return new Response(
                JSON.stringify({ message: "Позиция не найдена или не удалена" }),
                { status: 404 }
            );
        }

        console.log(`Позиция с ProductId=${productId} успешно удалена из корзины`);
        return new Response(JSON.stringify({ message: "Позиция успешно удалена" }), {
            status: 200,
        });
    } catch (error) {
        console.error("Ошибка при удалении позиции из корзины:", error.message);
        return new Response(
            JSON.stringify({ error: "Ошибка сервера при удалении позиции" }),
            { status: 500 }
        );
    }
}

export async function GET(req) {
    const token = req.headers.get('authorization')?.split(' ')[1];

    if (!token) {
        console.log('Токен не предоставлен');
        return new Response(JSON.stringify({ message: 'Tокен не предоставлен' }), { status: 401 });
    }

    try {
        const user = await getCart(token);
        return new Response(JSON.stringify(user), { status: 200 });
    } catch (error) {
        console.error('Ошибка при получении пользователя:', error.message);
        return new Response(JSON.stringify({ message: error.message }), { status: 401 });
    }
}

export async function DELETE(req) {
    const token = req.headers.get('authorization')?.split(' ')[1];

    if (!token) {
        console.log('Токен не предоставлен');
        return new Response(JSON.stringify({ message: 'Tокен не предоставлен' }), { status: 401 });
    }

    try {
        // Извлекаем данные из тела запроса
        const body = await req.json();
        const productId = body.productId;

        if (!productId) {
            return new Response(JSON.stringify({ message: 'Не указан productId' }), { status: 400 });
        }

        const user = await deleteCartItem(token, productId);
        return new Response(JSON.stringify(user), { status: 200 });
    } catch (error) {
        console.error('Ошибка при удалении позиции из корзины:', error.message);
        return new Response(JSON.stringify({ message: error.message }), { status: 500 });
    }
}
