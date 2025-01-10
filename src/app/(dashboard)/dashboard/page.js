'use client'
import OrdersTable from "@/app/components/(ui)/OrderTable/OrderTable";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useData } from "../components/DataContext";
export default function Account() {
    const { userData } = useData()
    return (
      <div className="w-full">
          <h2 className="text-2xl font-bold">Мои данные</h2>
          <div className="w-full pl-3 mt-3">
            <h3 className="text-xl font-semibold">Адрес доставки</h3>
            <div className="flex mt-2 w-full">
                <div className="p-3 border border-solid border-stone-400 rounded-md">
                    <div className="flex">
                        <h3 className="mr-1">ФИО:</h3>
                        <h3>{userData?.UserName}</h3>
                    </div>
                    <div className="flex">
                        <h3 className="mr-1">Адрес:</h3>
                        <h3>г.Самара ул.Ново-Садовая д.200 кв.13</h3>
                    </div>
                    <div className="flex">
                        <h3 className="mr-1">Телефон:</h3>
                        <h3>{userData?.UserPhone || "Номер не найден"}</h3>
                    </div>
                    <div className="flex justify-between mt-2">
                        <Button className="w-1/2">Изменить</Button>
                        <Button variant="destructive">Удалить</Button>
                    </div>
                </div>
            </div>
          </div>
          <div className="w-full pl-3 mt-3">
            <h3 className="text-xl font-semibold">Заказы</h3>
            <OrdersTable/>
          </div>
      </div>
    );
  }
  