'use client'
import OrdersTable from "@/app/components/(ui)/OrderTable/OrderTable";
import { Button } from "@/components/ui/button";
import { useData } from '../../../components/DataContext'
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import Catalog from "@/app/components/Catalog/Catalog";
import Products from "./components/Products/Products";
import OrdersTableAdmin from "./components/Orders/OrderTableAdmin";

export default function Admin() {
    const [step, setStep] = useState(0)
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        return null; // Если куки нет
    }
    const router = useRouter()
    const { userData } = useData()
    useEffect(()=>{
        userData?.UserRole != 'admin' ? router.push('/dashboard/account') : null
    },[userData])

    //CASE 1
    const[usersData, setUsersData]=useState([])
    useEffect(()=>{
        const token = getCookie('token')
        fetch('/api/users',{
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        }).then((res)=>{
            return res.json()
        }).then((result)=>{
            setUsersData(result)
        })
    },[])

    //CASE 2

    

    const renderStepContent = () => {
        switch (step) {
            case 0:
                return (<div className="w-1/2 flex flex-col gap-3">
                    <Button onClick={()=>setStep(1)}>Пользователи</Button>
                    <Button onClick={()=>setStep(2)}>Товары</Button>
                    <Button onClick={()=>setStep(3)}>Заказы</Button>
                  </div>)
            case 1:
                return (<div className="flex flex-col gap-3">
                    <Button className="w-1/2" onClick={()=>setStep(0)}>Главная</Button>
                    <div className="table w-full ...">
                        <div className="table-header-group border-t border-stone-700 w-full">
                            <div className="table-row">
                                <div className="table-cell text-left bg-stone-200 p-1 w-1/5 border-x border-b border-stone-700">Id Пользователя</div>
                                <div className="table-cell text-left bg-stone-200 p-1 w-1/5 border-r border-b border-stone-700">Имя</div>
                                <div className="table-cell text-left bg-stone-200 p-1 w-1/5 border-r border-b border-stone-700">Email</div>
                                <div className="table-cell text-left bg-stone-200 p-1 w-1/5 border-r border-b border-stone-700">Телефон</div>
                                <div className="table-cell text-left bg-stone-200 p-1 w-1/5 border-r border-b border-stone-700">Роль</div>
                            </div>
                        </div>
                        <div className="table-row-group">
                            {usersData?.map((user)=>(
                                <div key={user.UserId} className="table-row">
                                    <div className="table-cell p-1 w-1/5 border-x border-b border-stone-700"><Link className="text-blue-500 underline" href={`admin/user#${user?.UserId}`}>{user?.UserId}</Link></div>
                                    <div className="table-cell p-1 w-1/5 border-r border-b border-stone-700">{user?.UserName}</div>
                                    <div className="table-cell p-1 w-1/5 border-r border-b border-stone-700">{user?.UserEmail}</div>
                                    <div className="table-cell text-right p-1 w-1/5 border-r border-b border-stone-700">{user?.UserPhone}</div>
                                    <div className="table-cell p-1 w-1/5 border-r border-b border-stone-700">{user?.UserRole}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                  </div>)
                case 2:
                    return (
                    <div className="">
                        <Button className="w-1/2 mb-5" onClick={()=>setStep(0)}>Главная</Button>
                        <Products/>
                    </div>)
                case 3:
                    return(
                        <div>
                            <Button className="w-1/2 mb-5" onClick={()=>setStep(0)}>Главная</Button>
                            <OrdersTableAdmin/>
                        </div>
                    )
            }
        }
            
    return (
      <div className="w-full">
          <h2 className="text-2xl font-bold">Админ панель</h2>
          {renderStepContent()}
      </div>
    );
  }
  