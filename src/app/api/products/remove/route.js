
import pool from "../../server";
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET_KEY;

export async function DELETE(req) {
  try {
    const token = req.headers.get('authorization')?.split(' ')[1];
    const productId = await req.json()
    console.log(productId);

    if (!token) {
      console.log('Токен не предоставлен');
      return new Response(JSON.stringify({ message: 'Токен не предоставлен' }), { status: 401 });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, SECRET_KEY);
    } catch (err) {
      console.error('Ошибка декодирования токена:', err);
      return new Response(JSON.stringify({ message: 'Неверный токен' }), { status: 401 });
    }

    const role = decoded.role;
    if (role !== 'admin') {
      return new Response(JSON.stringify({ message: 'Доступ запрещен' }), { status: 403 });
    }

    const result = await pool.query('DELETE FROM products WHERE ProductId = ?', productId);

    if (result.rowCount === 0) {
      return new Response(JSON.stringify({ message: 'Продукт не найден' }), { status: 404 });
    }

    return new Response(JSON.stringify({ message: 'Продукт успешно удален' }), { status: 200 });

  } catch (error) {
    console.error('Ошибка сервера:', error);
    return new Response(
      JSON.stringify({ error: 'Произошла ошибка при удалении товара' }),
      { status: 500 }
    );
  }
}

