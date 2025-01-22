'use client'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AcceptModule() {
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
            }
        })
    }
    useEffect(()=>{
        getCart()
    },[])
    const [isSuccessDialogOpen, setSuccessDialogOpen] = useState(false)
    const [isErrorDialogOpen, setErrorDialogOpen] = useState(false)
    async function createOrder() {
        const token = getCookie('token');
    
        const orderData = {
            products: cart.map(item => ({
                productId: item.ProductId,
                productCount: item.ProductCount,
                productSize: item.ProductSize
            }))
        };
    
        try {
            const response = await fetch('/api/orders/get-orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(orderData)
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to create order');
            }
    
            const result = await response.json();
            setSuccessDialogOpen(true)
            console.log('Order created successfully:', result);
        } catch (error) {
            setErrorDialogOpen(true)
        }
    }
    
    return (
        cart.length !== 0 ?
        <div className="w-full">
            <h2 className="text-2xl font-bold">Ваш Заказ:</h2>
            <div className="flex gap-5 w-full justify-between pl-3 mt-3">
                <div className="cart-price border w-full border-stone-500 rounded-xl p-1">
                    <div className="cart-price flex gap-1">
                        {cart.length == 0 ? "Пока что здесь пусто" : cart.map((item)=>(
                            <div key={item?.ProductId} className={`mb-5 flex h-auto p-2 border border-stone-200 rounded-xl ${cart.length > 2 ? "w-1/3" : "w-1/2"}`}> 
                                <div className="w-1/5 h-max aspect-square rounded-xl overflow-hidden" style={{background: `url(${item?.ProductImagesArray[0]}) center center/cover no-repeat`}}></div>
                                <div className="ml-3 flex flex-col justify-between w-3/5">
                                    <div>
                                        <h2 className="text-xl font-semibold">{item?.ProductName}</h2>
                                        <h2 className="text-xs text-stone-400 font-thin">Размер: {item?.ProductSize}</h2>
                                    </div>
                                    <h3 className="text-xl font-semibold">{item?.TotalPricePerItem}р</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                    <h2 className="text-xl font-semibold mb-5">ИТОГО: {cart.length != 0 ? Math.ceil(cart[0]?.TotalCartPrice) : 0}p</h2>
                    <div className="mb-5">
                        <div className="w-max border border-stone-200">
                            <legend className="bg-slate-500 text-white text-center w-full">Пункт выдачи</legend>
                            <div className="px-2">
                                <input type="radio" id="kosmo" name="filial" value="kosmo"/>
                                <label htmlFor="kosmo">ТЦ. Космопорт</label>
                            </div>
                            <div className="px-2">
                                <input disabled type="radio" id="aurora" name="filial" value="aurora" />
                                <label htmlFor="aurora">ТЦ. Аврора Молл</label>
                            </div>
                        </div>
                    </div>
                    <Button onClick={()=>{createOrder()}}>Продолжить</Button>
                </div>
            </div>
            <AlertDialog open={isSuccessDialogOpen} onOpenChange={setSuccessDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                    <AlertDialogTitle>Успех!</AlertDialogTitle>
                    <AlertDialogDescription>
                        Заказ успешно оформлен
                    </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogAction onClick={()=>{router.push('/dashboard/orders')}}>Продолжить</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            <AlertDialog open={isErrorDialogOpen} onOpenChange={setErrorDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                    <AlertDialogTitle>Ошибка</AlertDialogTitle>
                    <AlertDialogDescription>
                        Произошла ошибка сервера
                    </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogAction className="bg-red-700">Продолжить</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div> : <h2>Ваша корзина пуста</h2>
    );
  }
  