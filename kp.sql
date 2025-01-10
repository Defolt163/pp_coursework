-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Хост: localhost
-- Время создания: Янв 10 2025 г., 12:26
-- Версия сервера: 10.4.28-MariaDB
-- Версия PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `kp`
--

-- --------------------------------------------------------

--
-- Структура таблицы `cart`
--

CREATE TABLE `cart` (
  `Id` int(11) NOT NULL,
  `UserId` int(11) NOT NULL,
  `ProductId` int(11) NOT NULL,
  `ProductCount` int(11) NOT NULL,
  `ProductSize` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `cart`
--

INSERT INTO `cart` (`Id`, `UserId`, `ProductId`, `ProductCount`, `ProductSize`) VALUES
(1, 13, 2, 2, 'М');

-- --------------------------------------------------------

--
-- Структура таблицы `orders`
--

CREATE TABLE `orders` (
  `OrderId` int(11) NOT NULL,
  `UserId` int(11) NOT NULL,
  `OrderDate` date NOT NULL,
  `SummaryOrder` int(11) NOT NULL,
  `OrderStatus` text NOT NULL DEFAULT 'Создан'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `orders`
--

INSERT INTO `orders` (`OrderId`, `UserId`, `OrderDate`, `SummaryOrder`, `OrderStatus`) VALUES
(2, 13, '2024-12-20', 23, 'Создан'),
(3, 13, '2024-12-23', 111, 'Создан'),
(4, 13, '2024-12-20', 12, 'Создан');

-- --------------------------------------------------------

--
-- Структура таблицы `order_products`
--

CREATE TABLE `order_products` (
  `OrderProductId` int(11) NOT NULL,
  `OrderId` int(11) NOT NULL,
  `ProductId` int(11) NOT NULL,
  `ProductCount` int(11) DEFAULT 1,
  `ProductSize` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `order_products`
--

INSERT INTO `order_products` (`OrderProductId`, `OrderId`, `ProductId`, `ProductCount`, `ProductSize`) VALUES
(2, 4, 2, 1, 'М'),
(7, 2, 1, 2, 'M'),
(8, 2, 2, 1, 'L');

-- --------------------------------------------------------

--
-- Структура таблицы `products`
--

CREATE TABLE `products` (
  `ProductId` int(11) NOT NULL,
  `ProductName` text NOT NULL,
  `ProductCategory` text NOT NULL,
  `ProductImages` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`ProductImages`)),
  `ProductDescription` text NOT NULL,
  `ProductSizeM` int(3) NOT NULL DEFAULT 0,
  `ProductSizeS` int(11) NOT NULL DEFAULT 0,
  `ProductSizeXL` int(11) NOT NULL DEFAULT 0,
  `ProductSizeXXL` int(11) NOT NULL DEFAULT 0,
  `ProductPrice` int(11) NOT NULL,
  `ProductDiscount` int(11) DEFAULT NULL,
  `ProductRating` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `products`
--

INSERT INTO `products` (`ProductId`, `ProductName`, `ProductCategory`, `ProductImages`, `ProductDescription`, `ProductSizeM`, `ProductSizeS`, `ProductSizeXL`, `ProductSizeXXL`, `ProductPrice`, `ProductDiscount`, `ProductRating`) VALUES
(1, 'Рубашка overshit', 'pants', '\"/products/t-shirt-2/1.webp,/products/t-shirt-2/2.webp,/products/t-shirt-2/3.webp\"', 'Пуховик выполнен из водоотталкивающего текстиля. Утеплитель из натурального пуха и пера (85% /15%). Детали: водоотталкивающая пропитка enfo dwr, ветрозащитная технология enfo ripper, прямой крой, регулируемый капюшон, внутренние манжеты, 2 кармана.', 3, 8, 1, 0, 230, 5, 0),
(2, 'Пуховик Camel', 'jacket', '\"/products/kurtka/1.webp,/products/kurtka/2.webp,/products/kurtka/3.webp,/products/kurtka/4.webp\"', 'Пуховик выполнен из водоотталкивающего текстиля. Утеплитель из натурального пуха и пера (85% /15%). Детали: водоотталкивающая пропитка enfo dwr, ветрозащитная технология enfo ripper, прямой крой, регулируемый капюшон, внутренние манжеты, 2 кармана.', 4, 10, 4, 5, 999, 5, 0);

-- --------------------------------------------------------

--
-- Структура таблицы `reviews`
--

CREATE TABLE `reviews` (
  `Rev_id` int(11) NOT NULL,
  `ProductId` int(11) NOT NULL,
  `Rating` int(11) NOT NULL,
  `Name` text NOT NULL,
  `Text` text NOT NULL,
  `Date` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `UserId` int(11) NOT NULL,
  `UserPassword` text NOT NULL,
  `UserEmail` text NOT NULL,
  `UserName` text NOT NULL,
  `UserSurname` text DEFAULT NULL,
  `UserPhone` int(11) DEFAULT NULL,
  `UserCart` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `UserRole` text NOT NULL DEFAULT 'user'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`UserId`, `UserPassword`, `UserEmail`, `UserName`, `UserSurname`, `UserPhone`, `UserCart`, `UserRole`) VALUES
(1, '123', 'm.romanov.biz@gmail.com', 'Михаил Александрович Романов', NULL, NULL, NULL, 'user'),
(2, '123', 'm.romanov.biz@gmail.com1', 'Светлана', NULL, NULL, NULL, 'user'),
(3, 'qwerty', 'iperrogames@gmail.com', 'Мишка', NULL, NULL, NULL, 'user'),
(4, 'qwerty', 'iperrogames@gmail.com1', 'Мишка', NULL, NULL, NULL, 'user'),
(5, 'qwerty', 'iperrogames@gmail.com12', 'Мишка', NULL, NULL, NULL, 'user'),
(6, 'qwerty', 'iperrogames@gmail.com121', 'Мишка', NULL, NULL, NULL, 'user'),
(7, '123', 'bnn2@hotmail.com', 'Михаил Александрович Романов', NULL, NULL, NULL, 'user'),
(8, '123', 'bnn2@hotmail.com1', 'Михаил Александрович Романов', NULL, NULL, NULL, 'user'),
(9, '123', 'bnn2@hotmail.com12', 'Михаил Александрович Романов', NULL, NULL, NULL, 'user'),
(10, '123', 'bnn2@hotmail.com13', 'Михаил Александрович Романов', NULL, NULL, NULL, 'user'),
(11, '123', 'bnn2@hotmail.com131', 'Михаил Александрович Романов', NULL, NULL, NULL, 'user'),
(12, '123', 'bnn2@hotmail.com1312', 'Михаил Александрович Романов', NULL, NULL, NULL, 'user'),
(13, '$2b$10$/hWjUCfavxjKn62gN481n.V.LNaBXd4lwS9KIo5NBhHHGlxfoKCcW', 'bnn2@hotmail.com13121', 'Михаил Александрович Романов', NULL, NULL, NULL, 'admin'),
(14, '$2b$10$/hWjUCfavxjKn62gN481n.V.LNaBXd4lwS9KIo5NBhHHGlxfoKCcW', 'bnn2@hotmail.com131211', 'Михаил2 Романов2', NULL, NULL, NULL, 'user');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `cart`
--
ALTER TABLE `cart`
  ADD UNIQUE KEY `Id` (`Id`),
  ADD KEY `UserId` (`UserId`),
  ADD KEY `ProductId` (`ProductId`);

--
-- Индексы таблицы `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`OrderId`),
  ADD KEY `UserId` (`UserId`),
  ADD KEY `UserId_2` (`UserId`);

--
-- Индексы таблицы `order_products`
--
ALTER TABLE `order_products`
  ADD PRIMARY KEY (`OrderProductId`),
  ADD KEY `OrderId` (`OrderId`),
  ADD KEY `ProductId` (`ProductId`);

--
-- Индексы таблицы `products`
--
ALTER TABLE `products`
  ADD UNIQUE KEY `ProductId` (`ProductId`);

--
-- Индексы таблицы `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`Rev_id`),
  ADD KEY `ProductId` (`ProductId`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`UserId`),
  ADD KEY `UserCart` (`UserCart`(768));

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `orders`
--
ALTER TABLE `orders`
  MODIFY `OrderId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT для таблицы `order_products`
--
ALTER TABLE `order_products`
  MODIFY `OrderProductId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT для таблицы `reviews`
--
ALTER TABLE `reviews`
  MODIFY `Rev_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `UserId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `users` (`UserId`),
  ADD CONSTRAINT `cart_ibfk_2` FOREIGN KEY (`ProductId`) REFERENCES `products` (`ProductId`);

--
-- Ограничения внешнего ключа таблицы `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `users` (`UserId`);

--
-- Ограничения внешнего ключа таблицы `order_products`
--
ALTER TABLE `order_products`
  ADD CONSTRAINT `order_products_ibfk_1` FOREIGN KEY (`OrderId`) REFERENCES `orders` (`OrderId`) ON DELETE CASCADE,
  ADD CONSTRAINT `order_products_ibfk_2` FOREIGN KEY (`ProductId`) REFERENCES `products` (`ProductId`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`ProductId`) REFERENCES `products` (`ProductId`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
