'use client'
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner"
import { Toaster } from "@/components/ui/sonner"

export default function CartModule() {
    const router = useRouter()
    const [cart, setCart] = useState([])
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        return null; // Если куки нет
    }
    function getCart(){
        const token = getCookie('token');
        fetch('/api/cart', {
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
        .then((items)=>{
            if(items.length >= 1){
                setCart(items)
            }else{
                setCart([])
            }
        })
    }
    useEffect(()=>{
        getCart()
    },[])
    function deleteItem(i){
        const token = getCookie('token');
        fetch('/api/cart', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({"productId": i})
            }
        )
        .then(() => {
            toast(<div className="flex items-center">
                Удалено <i className="fa-solid ml-1 text-xl text-green-600 fa-circle-check"></i>
              </div>)
            getCart();
        }).catch(()=>{
            toast(<div className="flex items-center">
                Ошибка удаления <i className="fa-solid ml-1 text-xl text-red-600 fa-triangle-exclamation"></i>
              </div>)
        })
    }
    return (
      <div className="w-full">
          <h2 className="text-2xl font-bold">Ваша корзина</h2>
          <div className="flex gap-5 w-full justify-between pl-3 mt-3">
            <div className="cart-price w-3/4 border border-stone-500 rounded-xl p-5 pb-0">
                {cart.length == 0 ? "Пока что здесь пусто" : cart.map((item)=>(
                    <div key={item?.ProductId} className="cart-item mb-5 w-full flex justify-between">
                        <div className="w-1/5 aspect-square rounded-xl" style={{background: `url(${item?.ProductImagesArray[0]}) center center/cover no-repeat`}}></div>
                        <div className="ml-3 w-3/5 flex flex-col justify-between">
                            <div>
                                <h2 className="text-xl font-semibold">{item?.ProductName}</h2>
                                <h2 className="text-xs text-stone-400 font-thin">Размер: {item?.ProductSize}</h2>
                            </div>
                            <h3 className="text-xl font-semibold">{item?.TotalPricePerItem}р</h3>
                        </div>
                        <div className="flex flex-col justify-between">
                            <Button onClick={(i)=>{deleteItem(item?.ProductId)}}>Удалить</Button>
                            <div className="flex border bg-stone-300 rounded-sm text-xl">
                                <div className="w-1/3 text-center cursor-pointer leading-tight">-</div>
                                <div className="w-1/3 text-center border-x border-stone-200">{Math.ceil(item?.ProductCount)}</div>
                                <div className="w-1/3 text-center cursor-pointer">+</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="cart-items h-max w-1/4 border border-stone-500 rounded-xl p-5 flex flex-col justify-between">
                <h2 className="text-2xl font-bold">Ваш заказ</h2>
                <div>
                    <div className="flex text-md font-thin my-2 justify-between">
                        <h2 className="">Товары</h2>
                        <h2 className="">{cart.length != 0 ? cart[0]?.TotalCartPrice : 0}p</h2>
                    </div>
                    <div className="flex text-md font-thin my-2 justify-between">
                        <h2 className="">Скидка 10%</h2>
                        <h2 className="text-red-700">-{cart.length != 0 ? Math.ceil(cart[0]?.TotalCartPrice * 0.1) : 0}p</h2>
                    </div>
                </div>
                <div>
                    <div className="flex my-2">
                        <h2 className="text-xl font-semibold">Итого:</h2>
                        <h2 className="text-xl font-semibold">{cart.length != 0 ? Math.ceil(cart[0]?.TotalCartPrice * 0.9) : 0}p</h2>
                    </div>
                    <Button className={`w-full ${cart.length != 0 ? "" : "bg-neutral-600 hover:bg-neutral-600 hover:cursor-auto"}`} onClick={()=>{cart.length != 0 ? router.push('/dashboard/cart/acceptorder') : null}}>Продолжить</Button>
                </div>
            </div>
          </div>
          <Toaster />
      </div>
    );
  }
  