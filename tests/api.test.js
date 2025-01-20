// tests/api.test.js
import { describe, it, expect, beforeAll } from 'vitest';
import supertest from 'supertest';
import jwt from 'jsonwebtoken';
import pool from './server'
const bcrypt = require('bcryptjs'); // or require('bcrypt') depending on your package

const request = supertest('http://localhost:3000'); // Убедись, что сервер работает на этом порту

const SECRET_KEY = process.env.JWT_SECRET_KEY; // Твой секретный ключ для JWT
let token;

// Пример тестового пользователя для базы данных
const testUser = {
    email: 'bnn2@hotmail.com13121',
    password: '123', // Этот пароль будет зашифрован в базе данных
  };
  
  describe('POST /api/login', () => {

    it('должен возвращать JWT при правильных данных', async () => {
      const response = await request
        .post('/api/login')
        .send({ email: testUser.email, password: testUser.password })
        .expect(200);
  
      const body = JSON.parse(response.text);
      token = body.token;
  
      expect(token).toBeDefined();
    });
  
    it('должен возвращать ошибку при неправильном пароле', async () => {
      const response = await request
        .post('/api/login')
        .send({ email: testUser.email, password: 'wrongpassword' })
        .expect(401);
  
      const body = JSON.parse(response.text);
      expect(body.message).toBe('Неверный пароль');
    });
  
    it('должен возвращать ошибку при неправильном email', async () => {
      const response = await request
        .post('/api/login')
        .send({ email: 'nonexistent@example.com', password: testUser.password })
        .expect(404);
  
      const body = JSON.parse(response.text);
      expect(body.message).toBe('Не найден');
    });
  });

describe('POST /api/sign-up', () => {
    it('должен успешно зарегистрировать пользователя и вернуть токен', async () => {
      const response = await request
        .post('/api/sign-up') // Убедись, что путь правильный
        .send({
          name: 'Test',
          email: 'test@example.com',
          password: 'test123',
        })
        .expect(201); // Ожидаем, что запрос пройдет с кодом 201 (создано)
  
      const body = JSON.parse(response.text);
  
      // Проверка, что токен существует
      expect(body.token).toBeDefined();
  
    });
  
    it('должен возвращать ошибку, если пользователь уже существует', async () => {
      // Создание пользователя перед тестом
      const hashedPassword = await bcrypt.hash('test123', 10);
      await pool.query(
        'INSERT INTO users (UserEmail, UserPassword, UserName) VALUES (?, ?, ?)',
        ['test@example.com', hashedPassword, 'Test User']
      );
  
      const response = await request
        .post('/api/sign-up') // Убедись, что путь правильный
        .send({
          name: 'Test User',
          email: 'test@example.com', // Используем уже существующий email
          password: 'test123',
        })
        .expect(400); // Ожидаем ошибку 400 (пользователь уже существует)
  
      const body = JSON.parse(response.text);
      expect(body.message).toBe('Пользователь уже существует');
    });

    afterAll(async () => {
        try {
            await pool.query('DELETE FROM users WHERE UserEmail = ?', ['test@example.com']);
        } catch (error) {
          console.error('Ошибка при удалении пользователя:', error);
        }
    });
  });