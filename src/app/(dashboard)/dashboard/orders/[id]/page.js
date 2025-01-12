'use client'
import OrdersTable from "@/app/components/(ui)/OrderTable/OrderTable";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function OrderId() {
  const router = useRouter()
  const pathname = usePathname()
  const orderId = pathname.split('/').filter(Boolean).pop()
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null; // Если куки нет
  }
  const [products, setProducts] = useState([])
  useEffect(()=>{
    const token = getCookie('token');
    fetch(`/api/orders/order-info/${orderId}`,{
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    }).then((response)=>{
      return response.json()
    }).then((res)=>{
      console.log("RESS", res)
      setProducts(res)
    })
  },[])
    return (
      <div className="w-full">
          <h2 className="text-2xl font-bold">Заказы</h2>
          <Button onClick={()=>{router.push('/dashboard/orders')}}>Вернуться</Button>
          <div className="flex gap-5 w-full justify-between pl-3 mt-3">
            <div className="cart-price border w-full border-stone-500 rounded-xl p-1">
              <h2>Заказ №{products && products.orderId}</h2>
                <div className="cart-price flex gap-1">
                    {products?.items?.length == 0 ? "Пока что здесь пусто" : products?.items?.map((item)=>(
                        <div key={item?.ProductId} className={`mb-5 flex h-max p-2 border border-stone-200 rounded-xl ${products.length > 2 ? "w-1/3" : "w-1/2"}`}> 
                            <div className="w-1/5 h-max aspect-square rounded-xl overflow-hidden" style={{background: `url(${item?.ProductImagesArray[0]}) center center/cover no-repeat`}}></div>
                            <div className="ml-3 w-3/5">
                                <div>
                                    <h2 className="text-xl font-semibold">{item?.ProductName}</h2>
                                    <h2 className="text-xs text-stone-400 font-thin">Размер: {item?.ProductSize}</h2>
                                </div>
                                <h3 className="text-xl font-semibold">{item?.ProductPrice}р</h3>
                            </div>
                        </div>
                    ))}
                </div>
                <h2>Пункт выдачи: ТК Космопорт</h2>
                <h2 >Статус заказа: <span className="font-bold">{products && products.orderStatus}</span></h2>
                <h2 className="font-bold text-lg">Сумма заказа: {products && products.total}р</h2>
                {/* <h2 className="text-xl font-semibold mb-5">ИТОГО: {cart.length != 0 ? Math.ceil(cart[0]?.TotalCartPrice * 0.9) : 0}p</h2> */}
                {/* <Button onClick={()=>{createOrder()}}>Продолжить</Button> */}
            </div>
        </div>
      </div>
    );
  }
  