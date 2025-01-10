'use client'
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export default function CartModule() {
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
            console.log(items)
            setCart(items)
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
        .then(()=>{
            getCart()
        })
    }
    return (
      <div className="w-full">
          <h2 className="text-2xl font-bold">Ваша корзина</h2>
          <div className="flex gap-5 w-full justify-between pl-3 mt-3">
            <div className="cart-price w-3/4 border border-stone-500 rounded-xl p-5 pb-0">
                {cart?.map((item)=>(
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
                        <h2 className="">{cart[0]?.TotalCartPrice}p</h2>
                    </div>
                    <div className="flex text-md font-thin my-2 justify-between">
                        <h2 className="">Скидка 10%</h2>
                        <h2 className="text-red-700">-{Math.ceil(cart[0]?.TotalCartPrice * 0.1)}p</h2>
                    </div>
                </div>
                <div>
                    <div className="flex my-2">
                        <h2 className="text-xl font-semibold">Итого:</h2>
                        <h2 className="text-xl font-semibold">{Math.ceil(cart[0]?.TotalCartPrice * 0.9)}p</h2>
                    </div>
                    <Button className="w-full">Продолжить</Button>
                </div>
            </div>
          </div>
      </div>
    );
  }
  