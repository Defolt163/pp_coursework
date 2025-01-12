"use client"
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner"
import { Toaster } from "@/components/ui/sonner"


export default function OrdersTableAdmin() {
    const [orders, setOrders] = useState([])
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        return null; // Если куки нет
    }
    useEffect(()=>{
        const token = getCookie('token');
        fetch('/api/orders/get-orders/admin', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
            }
        )
        .then((res)=>{
            return res.json()
        })
        .then((orders)=>{
            setOrders(orders)
        })
    },[])

    const handleStatusChange = async (orderId, newStatus) => {
        try {
            const token = getCookie('token');
            const response = await fetch(`/api/orders/get-orders/admin`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ orderId, newStatus })
            });

            if (response.ok) {
                // Обновление статуса в локальном состоянии
                setOrders(prevOrders =>
                    prevOrders.map(order =>
                        order.OrderId === orderId ? { ...order, OrderStatus: newStatus } : order
                    )
                );
                toast(`Статус заказа №${orderId} обновлен на ${newStatus}`)
            } else {
                console.error('Ошибка обновления статуса заказа');
            }
        } catch (error) {
            console.error('Ошибка при отправке запроса на сервер:', error);
        }
    };
    return (
        <div className="mt-2">
            <table border="1">
                <thead>
                    <tr>
                        <th className="text-left bg-stone-200 p-1 w-1/5 border-x border-b border-stone-700">№ Заказа</th>
                        <th className="text-left bg-stone-200 p-1 w-1/5 border-x border-b border-stone-700">Дата заказа</th>
                        <th className="text-left bg-stone-200 p-1 w-1/5 border-x border-b border-stone-700">Позиций</th>
                        <th className="text-left bg-stone-200 p-1 w-1/5 border-x border-b border-stone-700">Сумма, ₽</th>
                        <th className="text-left bg-stone-200 p-1 w-1/5 border-x border-b border-stone-700">Статус</th>
                    </tr>
                </thead>
                <tbody>
                    {orders && orders.length !== undefined ? orders?.map((order)=>(
                        <>
                            <tr key={order?.OrderId} className="table-row">
                                <td className="table-cell p-1 w-1/5 border-x border-y border-stone-700"><Link className="text-blue-500 underline" href={`/dashboard/orders/${order?.OrderId}`}>{order?.OrderId}</Link></td>
                                <td className="table-cell p-1 w-1/5 border-r border-y border-stone-700">{order?.OrderDate}</td>
                                <td className="table-cell p-1 w-1/5 border-r border-y border-stone-700">{order?.Products.length}</td>
                                <td className="table-cell text-right p-1 w-1/5 border-r border-y border-stone-700">{order?.TotalPrice}</td>
                                <td className="table-cell p-1 w-1/5 border-r border-y border-stone-700">
                                    <select 
                                        name="status" 
                                        id="status-select"
                                        value={order.OrderStatus}
                                        onChange={(e) => handleStatusChange(order.OrderId, e.target.value)}>
                                        <option value="">{order?.OrderStatus}</option>
                                        <option value="Создан">Создан</option>
                                        <option value="Принят">Принят</option>
                                        <option value="В работе">В работе</option>
                                        <option value="Приостановлен">Приостановлен</option>
                                        <option value="Отказ">Отказ</option>
                                        <option value="На выдачу">На выдачу</option>
                                    </select>
                                </td>
                            </tr>
                            <td colspan="4">
                                <table border="1" width="100%" className="mb-1">
                                    <thead>
                                        <tr>
                                            <th className="text-left font-normal bg-stone-200 p-1 w-1/5 border-x border-b border-stone-700">Артикул</th>
                                            <th className="text-left font-normal bg-stone-200 p-1 w-1/5 border-x border-b border-stone-700">Наименование</th>
                                            <th className="text-left font-normal bg-stone-200 p-1 w-1/5 border-x border-b border-stone-700">Размер</th>
                                            <th className="text-left font-normal bg-stone-200 p-1 w-1/5 border-x border-b border-stone-700">Количество</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {order?.Products?.map((product)=>(
                                            <tr key={product?.ProductId}>
                                                <td className="table-cell p-1 w-1/5 border-x border-b border-stone-700">{product?.ProductId}</td>
                                                <td className="table-cell p-1 w-1/5 border-x border-b border-stone-700">{product?.ProductName}</td>
                                                <td className="table-cell p-1 w-1/5 border-x border-b border-stone-700">{product?.ProductSize}</td>
                                                <td className="table-cell p-1 w-1/5 border-x border-b border-stone-700">{product?.ProductCount}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </td>
                        </>
                    )) : <div className="mx-auto font-bold text-xl mb-32">Ошибка сервера. Но мы уже работаем над этим...</div>}
                </tbody>
            </table>

            {/* <div className="table w-full ...">
                <div className="table-header-group border-t border-stone-700 w-full">
                    <div className="table-row">
                        <div className="table-cell text-left bg-stone-200 p-1 w-1/5 border-x border-b border-stone-700"># Заказа</div>
                        <div className="table-cell text-left bg-stone-200 p-1 w-1/5 border-r border-b border-stone-700">Дата заказа</div>
                        <div className="table-cell text-left bg-stone-200 p-1 w-1/5 border-r border-b border-stone-700">Позиций</div>
                        <div className="table-cell text-left bg-stone-200 p-1 w-1/5 border-r border-b border-stone-700">Сумма, ₽</div>
                        <div className="table-cell text-left bg-stone-200 p-1 w-1/5 border-r border-b border-stone-700">Статус</div>
                    </div>
                </div>
                <div className="table-row-group">
                    {orders && orders.length !== undefined ? orders?.map((order)=>(
                        <>
                            <div key={order.OrderId} className="table-row">
                                <div className="table-cell p-1 w-1/5 border-x border-b border-stone-700"><Link className="text-blue-500 underline" href={`/dashboard/orders/${order?.OrderId}`}>{order?.OrderId}</Link></div>
                                <div className="table-cell p-1 w-1/5 border-r border-b border-stone-700">{order?.OrderDate}</div>
                                <div className="table-cell p-1 w-1/5 border-r border-b border-stone-700">{order?.Products.length}</div>
                                <div className="table-cell text-right p-1 w-1/5 border-r border-b border-stone-700">{order?.TotalPrice}</div>
                                <div className="table-cell p-1 w-1/5 border-r border-b border-stone-700">{order?.OrderStatus}</div>
                            </div>
                        </>
                    )) : <div className="mx-auto font-bold text-xl mb-32">Ошибка сервера. Но мы уже работаем над этим...</div>}
                </div>
            </div> */}
            <Toaster />
        </div>
    );
}
