-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 14, 2025 at 04:54 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `kp`
--

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `Id` int(11) NOT NULL,
  `UserId` int(11) NOT NULL,
  `ProductId` int(11) NOT NULL,
  `ProductCount` int(11) NOT NULL,
  `ProductSize` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `OrderId` int(11) NOT NULL,
  `UserId` int(11) NOT NULL,
  `OrderDate` date NOT NULL,
  `SummaryOrder` int(11) NOT NULL,
  `OrderStatus` VARCHAR(255) NOT NULL DEFAULT 'Создан'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`OrderId`, `UserId`, `OrderDate`, `SummaryOrder`, `OrderStatus`) VALUES
(2, 13, '2024-12-20', 23, 'Принят'),
(3, 13, '2024-12-23', 111, 'Создан'),
(4, 13, '2024-12-20', 12, 'В работе'),
(5, 15, '2025-01-11', 0, 'Приостановлен'),
(6, 15, '2025-01-11', 0, 'Отказ'),
(15, 15, '2025-01-11', 0, 'На выдачу'),
(16, 13, '2025-01-12', 0, 'Принят'),
(17, 13, '2025-01-14', 0, 'В работе');

-- --------------------------------------------------------

--
-- Table structure for table `order_products`
--

CREATE TABLE `order_products` (
  `OrderProductId` int(11) NOT NULL,
  `OrderId` int(11) NOT NULL,
  `ProductId` int(11) NOT NULL,
  `ProductCount` int(11) DEFAULT 1,
  `ProductSize` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order_products`
--

INSERT INTO `order_products` (`OrderProductId`, `OrderId`, `ProductId`, `ProductCount`, `ProductSize`) VALUES
(30, 16, 6, 1, 'S'),
(31, 17, 14, 1, 'M'),
(32, 17, 6, 1, 'M'),
(33, 17, 18, 1, 'M');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `ProductId` int(11) NOT NULL,
  `ProductName` text NOT NULL,
  `ProductCategory` text NOT NULL,
  `ProductImages` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `ProductDescription` text NOT NULL,
  `ProductSizeM` int(3) NOT NULL DEFAULT 0,
  `ProductSizeS` int(11) NOT NULL DEFAULT 0,
  `ProductSizeXL` int(11) NOT NULL DEFAULT 0,
  `ProductSizeXXL` int(11) NOT NULL DEFAULT 0,
  `ProductPrice` int(11) NOT NULL,
  `ProductDiscount` text DEFAULT NULL,
  `ProductRating` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`ProductId`, `ProductName`, `ProductCategory`, `ProductImages`, `ProductDescription`, `ProductSizeM`, `ProductSizeS`, `ProductSizeXL`, `ProductSizeXXL`, `ProductPrice`, `ProductDiscount`, `ProductRating`) VALUES
(6, 'Куртка утепленная Regular Fit Lamoda Exclusive', 'jacket', '/products/d63fb68305da646ec4bd5efcd127f4e6/1.webp,/products/d63fb68305da646ec4bd5efcd127f4e6/2.webp,/products/d63fb68305da646ec4bd5efcd127f4e6/3.webp', 'Куртка выполнена из текстиля. Модель прямого кроя. Детали: застежка на молнию, 4 внешних кармана и 1 внутренний, несъемный капюшон на кулиске.', 5, 3, 1, 9, 20000, NULL, 0),
(13, 'Куртка утепленная', 'jacket', '/products/fe8a4c0dd92725429463ebed1b002868/1.webp,/products/fe8a4c0dd92725429463ebed1b002868/2.webp,/products/fe8a4c0dd92725429463ebed1b002868/3.webp', 'Утепленная куртка выполнена из текстильного материала. Детали: синтетический утеплитель, водоотталкивающая пропитка enfo dwr, прямой крой, регулируемый капюшон, 2 кармана.', 0, 5, 0, 2, 3500, NULL, 0),
(14, 'Футболка Sela', 't-shirt', '/products/d02ef1c385f36bb1b435bd0c5f3e73fb/1.webp,/products/d02ef1c385f36bb1b435bd0c5f3e73fb/2.webp,/products/d02ef1c385f36bb1b435bd0c5f3e73fb/3.webp', 'Футболка оверсайз кроя выполнена из плотного интерлока. Круглый вырез горловины и спущенное плечо. Рельефный вырез и низ рукавов.', 23, 11, 67, 43, 300, NULL, 0),
(15, 'Брюки Marhatter', 'pants', '/products/dfb9896703949ad9e0403c5b34e324e5/1.webp,/products/dfb9896703949ad9e0403c5b34e324e5/2.webp,/products/dfb9896703949ad9e0403c5b34e324e5/3.webp,/products/dfb9896703949ad9e0403c5b34e324e5/4.webp', 'Данный товар является частью проекта Lamoda planet - специального раздела нашего каталога, где мы собрали экологичные, этичные, инклюзивные и благотворительные товары. Товар произведен в стране присутствия Lamoda, что позволяет поддерживать развитие локальных фабрик, мастеров и швей. Покупая этот товар, вы также вносите свой вклад в сокращение углеродного следа.', 5, 4, 7, 12, 2340, NULL, 0),
(16, 'Брюки Grek', 'pants', '/products/bc52ca7cfdb27ed6568b46d91c1644a6/1.webp,/products/bc52ca7cfdb27ed6568b46d91c1644a6/2.webp,/products/bc52ca7cfdb27ed6568b46d91c1644a6/3.webp', 'Данный товар является частью проекта Lamoda planet - специального раздела нашего каталога, где мы собрали экологичные, этичные, инклюзивные и благотворительные товары. Товар произведен в стране присутствия Lamoda, что позволяет поддерживать развитие локальных фабрик, мастеров и швей. Покупая этот товар, вы также вносите свой вклад в сокращение углеродного следа.', 4, 5, 7, 9, 1999, NULL, 0),
(18, 'Товар #1', 'pants', '/products/7e9e5c95d8f7d20e641138340083c412/1.png', 'Меня зовут Михаил, я веб-разработчик из Самары. Моя специализация — создание корпоративных сайтов, веб-приложений, лендингов и интернет-магазинов.\r\n\r\nС 2022 года я работаю с современным фреймворком React и его расширением Next.js, создавая удобные, производительные и элегантные веб-продукты. Мой путь в веб-разработке начался в 2021 году с изучения HTML, CSS и JavaScript, что стало прочной основой для моего профессионального роста.\r\n\r\nПомимо разработки, у меня есть опыт в создании дизайна пользовательских интерфейсов, что позволяет мне находить гармонию между функциональностью и эстетикой в каждом проекте.\r\n\r\nЯ окончил 11 классов, колледж связи ПГУТИ, и в данный момент учусь в Поволжском государственном университете телекоммуникаций и информатики на факультете информационных систем и технологий. Моя специальность — сети связи и системы коммутации, обучение проходит в очно-заочной форме.\r\n\r\nЯ искренне люблю свое дело и стремлюсь развиваться как профессионал. В университете я являюсь активным участником студенческой жизни: принимаю участие в мероприятиях, состою в профкоме, нахожусь на посту председателя факультета информатики и вычислительной техники. А так-же, активно выступаю в качестве волонтера.', 9999, 9999, 999, 999, 2000000, NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `Rev_id` int(11) NOT NULL,
  `ProductId` int(11) NOT NULL,
  `Rating` int(11) NOT NULL,
  `Name` text NOT NULL,
  `Text` text NOT NULL,
  `Date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `UserId` int(11) NOT NULL,
  `UserPassword` text NOT NULL,
  `UserEmail` text NOT NULL,
  `UserName` text NOT NULL,
  `UserSurname` text DEFAULT NULL,
  `UserPhone` int(11) DEFAULT NULL,
  `UserCart` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `UserRole` VARCHAR(50) NOT NULL DEFAULT 'user'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


--
-- Dumping data for table `users`
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
(14, '$2b$10$/hWjUCfavxjKn62gN481n.V.LNaBXd4lwS9KIo5NBhHHGlxfoKCcW', 'bnn2@hotmail.com131211', 'Михаил2 Романов2', NULL, NULL, NULL, 'user'),
(15, '$2b$10$9vkVZvKVzr7H3DfBqoF.Xea7bSRwgzaXvQ.QCZdjPNV0XviJ8c2qC', 'm@m.m', 'Дмитрий', NULL, NULL, NULL, 'user');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD UNIQUE KEY `Id` (`Id`),
  ADD KEY `UserId` (`UserId`),
  ADD KEY `ProductId` (`ProductId`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`OrderId`),
  ADD KEY `UserId` (`UserId`),
  ADD KEY `UserId_2` (`UserId`);

--
-- Indexes for table `order_products`
--
ALTER TABLE `order_products`
  ADD PRIMARY KEY (`OrderProductId`),
  ADD KEY `OrderId` (`OrderId`),
  ADD KEY `ProductId` (`ProductId`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD UNIQUE KEY `ProductId` (`ProductId`);

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`Rev_id`),
  ADD KEY `ProductId` (`ProductId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`UserId`),
  ADD KEY `UserCart` (`UserCart`(768));

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `OrderId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `order_products`
--
ALTER TABLE `order_products`
  MODIFY `OrderProductId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `ProductId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `reviews`
--
ALTER TABLE `reviews`
  MODIFY `Rev_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `UserId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `users` (`UserId`),
  ADD CONSTRAINT `cart_ibfk_2` FOREIGN KEY (`ProductId`) REFERENCES `products` (`ProductId`);

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `users` (`UserId`);

--
-- Constraints for table `order_products`
--
ALTER TABLE `order_products`
  ADD CONSTRAINT `order_products_ibfk_1` FOREIGN KEY (`OrderId`) REFERENCES `orders` (`OrderId`) ON DELETE CASCADE,
  ADD CONSTRAINT `order_products_ibfk_2` FOREIGN KEY (`ProductId`) REFERENCES `products` (`ProductId`) ON DELETE CASCADE;

--
-- Constraints for table `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`ProductId`) REFERENCES `products` (`ProductId`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
