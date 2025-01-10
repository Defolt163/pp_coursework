'use client'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function UserInfo() {
    function getCookie(name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
      return null; // Если куки нет
    }
    const pathname = usePathname()
    const [hash, setHash] = useState('')
  
    useEffect(() => {
      const handleHashChange = () => {
        const urlSliced = window.location.hash.slice(1)
        setHash(Number(urlSliced));
      };
      window.addEventListener('hashchange', handleHashChange);
      handleHashChange();
      return () => {
      window.removeEventListener('hashchange', handleHashChange);
      };
    }, [pathname])

    const[userData, setUserData]=useState([])
    useEffect(() => {
      const token = getCookie('token')
      if(hash != 0){
        fetch(`/api/users/${hash}`,{
          method: "GET",
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
          }
        }).then((res)=>{
          return res.json()
        }).then((result)=>{
          setUserData(result)
          console.log("dd",result)
        })
      }
    }, [hash])
    
    /* function getUser(){
      fetch(`/api/users/${}`)
    } */
    return (
      <div className="w-full">
        <div className="flex gap-4">
          <Avatar className="w-1/4 rounded-xl h-auto mb-2">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn"/>
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="w-3/4">
            <h2 className="font-bold text-xl">{userData?.user?.UserName}</h2>
            <h2 className="font-bold text-xl">ID: <span className="font-thin">{userData?.user?.UserId}</span></h2>
            <h2 className="font-bold text-xl">Email: <span className="font-thin">{userData?.user?.UserEmail}</span></h2>
            <h2 className="font-bold text-xl">Телефон: <span className="font-thin">{userData?.user?.UserPhone}</span></h2>
            <h2 className="font-bold text-xl">Кол-во заказов: <span className="font-thin">{userData?.orders?.length}</span></h2>
            <h2 className="font-bold text-xl">Сумма заказов: <span className="font-thin">{userData?.grandTotal}р</span></h2>
          </div>
        </div>
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
              {userData?.orders?.map((order)=>(
                  <div key={order.OrderId} className="table-row">
                      <div className="table-cell p-1 w-1/5 border-x border-b border-stone-700"><Link className="text-blue-500 underline" href={`/dashboard/orders/${order?.OrderId}`}>{order?.OrderId}</Link></div>
                      <div className="table-cell p-1 w-1/5 border-r border-b border-stone-700">{order?.OrderDate}</div>
                      <div className="table-cell p-1 w-1/5 border-r border-b border-stone-700">{order?.TotalItems}</div>
                      <div className="table-cell text-right p-1 w-1/5 border-r border-b border-stone-700">{order?.TotalPrice}</div>
                      <div className="table-cell p-1 w-1/5 border-r border-b border-stone-700">{order?.OrderStatus}</div>
                  </div>
              ))}
          </div>
        </div>
      </div>
    );
  }
  