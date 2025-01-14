import { NextResponse } from 'next/server';
import pool from '../../server';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET_KEY; // Секрет для JWT

export async function GET(request, { params }) {
  try {
    const pid = (await params).id
    console.log(pid)
    const [rows] = await pool.query('SELECT * FROM products WHERE ProductId = ?',[pid]);
    const product_info = rows.map(product => {
        const images = product.ProductImages.replace(/"/g, '').split(','); // Преобразуем строку в массив
        return {
            ...product,
            ProductImagesArray: images, // Добавляем массив изображений
        };
    });

    return new Response(
        JSON.stringify(product_info),
        { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function PATCH(request, { params }) {
  try {
    const { id: pId } = await params

    // Парсим тело запроса
    const updates = await request.json();

    if (!updates || Object.keys(updates).length === 0) {
      return new Response(JSON.stringify({ message: 'Нет данных для обновления' }), { status: 400 });
    }

    const token = request.headers.get('authorization')?.split(' ')[1];

    const decoded = jwt.verify(token, SECRET_KEY);
    const role = decoded.role;
    //const [role] = await pool.query('SELECT UserRole FROM users WHERE UserId = ?', [reqId]);

    if (role !== 'admin') {
      return new Response(JSON.stringify({ message: 'Доступ запрещен' }), { status: 401 });
    }

    const fields = Object.keys(updates)
      .map((field) => `${field} = ?`)
      .join(', ');

    const values = Object.values(updates);

    console.log('FIELDS:', fields);
    console.log('VALUES:', values);

    // Выполнение обновления
    await pool.query(`UPDATE products SET ${fields} WHERE ProductId = ?`, [...values, pId]);

    return new Response(JSON.stringify({ message: 'Продукт обновлен успешно' }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: error.message }), { status: 500 });
  }
}
