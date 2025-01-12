import pool from "../../../server";
import jwt from 'jsonwebtoken';
const SECRET_KEY = process.env.JWT_SECRET_KEY;
async function getUserFromToken(token) {
    const decoded = jwt.verify(token, SECRET_KEY);
    const userId = decoded.id;
    
    const [role] = await pool.query('SELECT UserRole FROM users WHERE UserId = ?', [userId]);
    if(role[0].UserRole === 'admin'){
        const [rows] = await pool.query(`
            SELECT orders.OrderId, orders.UserId, users.UserName, orders.OrderDate, orders.OrderStatus, 
            products.ProductId, products.ProductName, products.ProductPrice, order_products.ProductSize, 
            order_products.ProductCount 
            FROM orders 
            JOIN order_products ON orders.OrderId = order_products.OrderId 
            JOIN products ON order_products.ProductId = products.ProductId 
            JOIN users ON orders.UserId = users.UserId 
            ORDER BY orders.OrderDate;
        `);
        
        const ordersMap = {};
        
        rows.forEach(row => {
            const { OrderId, UserId, UserName, OrderDate, OrderStatus, ProductId, ProductName, ProductPrice, ProductSize, ProductCount } = row;
        
            if (!ordersMap[OrderId]) {
                ordersMap[OrderId] = {
                    OrderId,
                    UserId,
                    UserName,
                    OrderDate,
                    OrderStatus,
                    TotalPrice: 0,
                    Products: []
                };
            }
        
            const productTotalPrice = ProductPrice * ProductCount;
            ordersMap[OrderId].TotalPrice += productTotalPrice;
        
            ordersMap[OrderId].Products.push({
                ProductId,
                ProductName,
                ProductSize,
                ProductCount,
                ProductPrice,
                ProductTotalPrice: productTotalPrice
            });
        });
        
        const orders = Object.values(ordersMap);
        
    
        return orders;
    }else{
        return new Response(JSON.stringify([]), { status: 200 });
    }
}

export async function GET(req) {
    const token = req.headers.get('authorization')?.split(' ')[1];

    if (!token) {
        console.log('Токен не предоставлен');
        return new Response(JSON.stringify({ message: 'Tокен не предоставлен' }), { status: 401 });
    }

    try {
        const user = await getUserFromToken(token);
        return new Response(JSON.stringify(user), { status: 200 });
    } catch (error) {
        console.error('Ошибка при получении пользователя:', error.message);
        return new Response(JSON.stringify({ message: error.message }), { status: 401 });
    }
}

export async function PATCH(req) {
    const token = req.headers.get('authorization')?.split(' ')[1];

    if (!token) {
        console.log('Токен не предоставлен');
        return new Response(JSON.stringify({ message: 'Tокен не предоставлен' }), { status: 401 });
    }
    const decoded = jwt.verify(token, SECRET_KEY);
    const role = decoded.role;
    
    //const [role] = await pool.query('SELECT UserRole FROM users WHERE UserId = ?', [userId]);
    if(role === 'admin'){
        const { orderId, newStatus } = await req.json();

        if (!orderId || !newStatus) {
            return new Response(JSON.stringify({ message: 'Необходимы orderId и newStatus' }), { status: 400 });
        }

        const [result] = await pool.query(
            `UPDATE orders SET OrderStatus = ? WHERE OrderId = ?`,
            [newStatus, orderId]
        );

        if (result.affectedRows > 0) {
            return new Response(JSON.stringify({ message: 'Статус заказа обновлен' }), { status: 200 });
        } else {
            return new Response(JSON.stringify({ message: 'Не удалось обновить статус заказа' }), { status: 500 });
        }
    }else{
        return new Response(JSON.stringify([]), { status: 200 });
    }
}
