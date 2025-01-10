'use client'
import { useData } from "@/app/(dashboard)/components/DataContext";
import { NavUser } from "@/components/nav-user";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SidebarProvider } from "@/components/ui/sidebar";
import Link from "next/link";

export default function UiList() {
  const { userData } = useData()
  const user = {
    avatar: 'https://github.com/shadcn.png',
    name: userData?.UserName,
    email: userData?.UserEmail
  }
  return (
    <div className="w-1/6 flex flex-col justify-between h-[calc(100vh-73px)] pr-1 relative after:w-px after:h-full after:bg-slate-400 after:absolute after:top-0 after:-right-0">
      <ul className="list-none w-full relative">
          <li className="font-bold">
            <Avatar className="w-4/5 h-auto mb-2">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn"/>
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <h2 className="text-xl">{userData?.UserName?.split(' ')[0]}</h2>
          </li>
          <li className="underline py-2 mt-5"><Link className="block" href="/dashboard/account">Профиль</Link></li>
          <li className="py-2"><Link className="block" href="/dashboard/orders">Заказы</Link></li>
          <li className="py-2"><Link className="block" href="/dashboard/cart">Корзина</Link></li>
          {userData?.UserRole === 'admin' ? <li className="py-2"><Link className="block" href="/dashboard/admin">Админ панель</Link></li> : null}
      </ul>
      <div className="">
        <SidebarProvider>
          <NavUser user={user}/>
        </SidebarProvider>
      </div>
    </div>
  );
}
