"use client";

import { useRouter } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";

const DataContext = createContext();

export function DataProvider({ children }) {
    const router = useRouter()
    const [userData, setUserData] = useState(null);
    
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        return null; // Если куки нет
    }

    // Функция для получения данных о пользователе
    function fetchUserData() {
        const token = getCookie('token'); // Получаем токен из куки
    
        return fetch('/api/login', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        })
        .then((response) => {
            if (!response.ok) { 
                if (response.status === 401) {
                  router.push('/login');
                }
            }
            return response.json()
        }).then((res)=>{
            setUserData(res);
            console.log("22", res)
        })
        .catch((error) => {
            console.error('Fetch error:', error);
        });
    }

    useEffect(() => {
        fetchUserData();
    }, []);

    return (
        <DataContext.Provider value={{ userData }}>
            {children}
        </DataContext.Provider>
    );
}

export function useData() {
    return useContext(DataContext);
}
