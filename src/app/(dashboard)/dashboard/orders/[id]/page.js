'use client'
import OrdersTable from "@/app/components/(ui)/OrderTable/OrderTable";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Progress } from "../../../../../../@/components/ui/progress";

export default function OrderId() {
  const router = useRouter()
  const pathname = usePathname()
  const orderId = pathname.split('/').filter(Boolean).pop()
  const [progressValue, setProgressValue] = useState(0)
  const [backdropProgress, setBackdropProgress] = useState('visible')
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null; // Если куки нет
  }
  const [products, setProducts] = useState([])
  useEffect(()=>{
    setBackdropProgress('visible')
    const token = getCookie('token');
    setProgressValue(80)
    fetch(`/api/orders/order-info/${orderId}`,{
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    }).then((response)=>{
      return response.json()
    }).then((res)=>{
      setProgressValue(100)
      setProducts(res)
    }).finally(() => {
      setBackdropProgress('invisible');
    })
  },[orderId])
    return (
      <>
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
        <div className={`${backdropProgress} fixed w-full h-full top-0 left-0 bg-backdrop flex items-center justify-center`}>
          <Progress className='w-4/5 bg-white' value={progressValue}/>
        </div>
      </>
    );
  }
  