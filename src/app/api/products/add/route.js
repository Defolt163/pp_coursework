import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import pool from "../../server";
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET_KEY;

export const config = {
  api: {
    bodyParser: false, // Отключаем bodyParser для работы с большими файлами
  },
};

export async function POST(req, res) {
  try {
    const token = req.headers.get('authorization')?.split(' ')[1];

    if (!token) {
      console.log('Токен не предоставлен');
      return new Response(JSON.stringify({ message: 'Tокен не предоставлен' }), { status: 401 });
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

    const formData = await req.formData(); // Получаем formData
    const name = formData.get('name');
    const descr = formData.get('descr');
    const category = formData.get('category');
    const price = formData.get('price');

    // Извлечение категорий (если их несколько)
    const sizeRaw = formData.getAll('sizes'); // Возвращает массив значений для ключа 'category'

    // Преобразование категорий (если нужно разбить строку)
    const sizes = sizeRaw.flatMap(cat => cat.split(','));
    const files = formData.getAll('files'); // Получаем все файлы

    if (!files.length) {
      return new Response(JSON.stringify({ error: 'Файлы не были отправлены' }), { status: 400 });
    }

    // Генерация случайного имени папки
    const randomFolderName = crypto.randomBytes(16).toString('hex');
    const folderPath = path.join(process.cwd(), 'public/products', randomFolderName);

    // Проверяем и создаем папку
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }

    // Массив для хранения относительных путей файлов
    const filePaths = [];

    // Сохранение файлов
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const fileExtension = path.extname(file.name); // Расширение файла
      const fileName = `${i + 1}${fileExtension}`; // Имя файла
      const filePath = path.join(folderPath, fileName);

      // Записываем файл
      await fs.promises.writeFile(filePath, Buffer.from(await file.arrayBuffer()));

      // Извлечение относительного пути начиная с 'products/'
      const relativePath = path.relative(path.join(process.cwd(), 'public'), filePath);

      // Добавляем относительный путь в массив
      filePaths.push(`/${relativePath.replace(/\\/g, '/')}`); // Добавляем '/' перед относительным путем
    }

    // Преобразование массива путей в строку
    const filePathsString = filePaths.join(',');
    console.log('Uploaded file paths:', filePathsString);

    // Пример вставки в базу данных
    await pool.query('INSERT INTO products (ProductName, ProductCategory, ProductImages, ProductDescription, ProductSizeM, ProductSizeS, ProductSizeXL, ProductSizeXXL, ProductPrice) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [name, category, filePathsString, descr, sizes[0], sizes[1], sizes[2], sizes[3], price]);

    return new Response(JSON.stringify({ message: 'Файлы успешно загружены', folder: randomFolderName }), { status: 200 });
  } catch (error) {
    console.error('Ошибка при загрузке файлов:', error);
    return new Response(
      JSON.stringify({ error: 'Ошибка загрузки файлов', details: error.message }),
      { status: 500 }
    );
  }
}
