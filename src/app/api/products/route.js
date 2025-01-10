import pool from "../server";

export async function GET() {
    try {
        const [rows] = await pool.query('SELECT * FROM products');

        // Обрабатываем каждый продукт, преобразуя строку с картинками в массив
        const products = rows.map(product => {
            const images = product.ProductImages.replace(/"/g, '').split(','); // Преобразуем строку в массив
            return {
                ...product,
                ProductImagesArray: images, // Добавляем массив изображений
            };
        });

        return new Response(
            JSON.stringify(products),
            { status: 200, headers: { "Content-Type": "application/json" } }
        );
    } catch (err) {
        console.error('Ошибка на сервере:', err);
        return new Response(
            JSON.stringify({ message: "Ошибка сервера" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}
