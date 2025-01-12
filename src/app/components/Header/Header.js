'use client'
import { useData } from "@/app/(dashboard)/components/DataContext";
import Link from "next/link";
import { useEffect } from "react";

export default function Header(){
    const { userData } = useData()
    useEffect(()=>{
        console.log("FFF",userData)
    },[userData])
    return(
        <header className=" container mx-auto py-1.5 columns-3 w-full">
            <Link href={'/'} className="font-black">ROMANOV-STORE</Link>
            <ul className="flex justify-between w-full columns-3 list-none">
                <li>КАТЕГОРИИ</li>
                <li><Link href={'#'}>Бестселлеры</Link></li>
                <li><Link href={'#'}>Бренды</Link></li>
            </ul>
            <ul className="flex w-full columns-2 list-none justify-end">
                <li className="flex justify-center items-center mx-2 w-8 bg-white text-black rounded-full aspect-square"><Link className="h-max" href={'/cart'}><i style={{lineHeight: "2"}} className="leading-loose fa-solid fa-cart-shopping"></i></Link></li>
                <li className="flex justify-center items-center w-8 bg-white text-black rounded-full aspect-square"><Link className="h-max" href={userData == null ? '/login' : '/dashboard'}><i style={{lineHeight: "2"}} className="leading-loose fa-solid fa-user"></i></Link></li>
                {/* <li className="flex justify-center items-center w-8 bg-white text-black rounded-full aspect-square"><Link className="h-max" href={'/login'}><i style={{lineHeight: "2"}} className="leading-loose fa-solid fa-user"></i></Link></li>
                <li className="flex justify-center items-center w-8 bg-white text-black rounded-full aspect-square"><Link className="h-max" href={'/dashboard'}><i style={{lineHeight: "2"}} className="leading-loose fa-solid fa-user"></i>2</Link></li> */}
            </ul>
            
        </header>
    )
}