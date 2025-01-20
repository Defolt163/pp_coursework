// vitest.config.js
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',  // Указывает, что для тестирования будем использовать jsdom (для работы с React-компонентами)
    globals: true,          // Для использования глобальных функций, таких как `describe`, `it`, `expect`
    setupFiles: ['./jest.setup.js'], // Указание на файл с настройками для тестов, если нужно
  },
});
