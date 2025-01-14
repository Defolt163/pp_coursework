# Используем официальный образ Node.js
FROM node:20.10

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем весь проект
COPY . .

# Строим Next.js проект
RUN npm run build

# Экспонируем порт приложения
EXPOSE 3000

# Запускаем приложение
CMD ["npm", "start"]
