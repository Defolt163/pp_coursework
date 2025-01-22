"use client"
import Link from "next/link";
import { useEffect, useState } from "react";

export default function OrdersTable() {
    const [orders, setOrders] = useState([])
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        return null; // Если куки нет
    }
    useEffect(()=>{
        const token = getCookie('token');
        fetch('/api/orders/get-orders', {
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
    return (
        <div className="mt-2">
            <div className="table w-full ...">
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
                        <div key={order.OrderId} className="table-row">
                            <div className="table-cell p-1 w-1/5 border-x border-b border-stone-700"><Link className="text-blue-500 underline" href={`/dashboard/orders/${order?.OrderId}`}>{order?.OrderId}</Link></div>
                            <div className="table-cell p-1 w-1/5 border-r border-b border-stone-700">{order?.OrderDate}</div>
                            <div className="table-cell p-1 w-1/5 border-r border-b border-stone-700">{order?.TotalItems}</div>
                            <div className="table-cell text-right p-1 w-1/5 border-r border-b border-stone-700">{order?.TotalPrice}</div>
                            <div className="table-cell p-1 w-1/5 border-r border-b border-stone-700">{order?.OrderStatus}</div>
                        </div>
                    )) : <div className="mx-auto font-bold text-xl mb-32">Ошибка сервера. Но мы уже работаем над этим...</div>}
                </div>
            </div>
        </div>
    );
}
