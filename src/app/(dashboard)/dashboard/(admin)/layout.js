'use client'
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useData } from "../../components/DataContext";

export default function AdminLayout({ children }) {
    const router = useRouter()
    const { userData } = useData()
    useEffect(()=>{
        userData?.UserRole != 'admin' ? router.push('/dashboard/account') : null
    },[userData])

    return (
        <>
            {children}
        </>
    )
  }