'use client'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Toaster } from "@/components/ui/sonner"

export function LoginForm({
  className,
  ...props
}) {
  const router = useRouter()
  function setCookie(name, value, days) {
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    const expiresStr = "expires=" + expires.toUTCString();
    document.cookie = `${name}=${value}; ${expiresStr}; path=/`;
  }
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null; // Если куки нет
  }

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
        if (response.ok) { 
          router.push('/dashboard')
        }
    })
  }
  useEffect(() => {
    fetchUserData();
  }, []);
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  async function login(e) {
    e.preventDefault();
    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const res = await response.json();

        if (response.ok) {
            setCookie('token', res.token, 7);
            toast(`Успешная авторизация`)
            router.push('/dashboard')
        } else {
            alert(res.message);
        }
    } catch (error) {
        toast(`Ошибка: Сервер недоступен.`)
    }
  }
  return (
    (<div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form onSubmit={(e)=>login(e)} className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Авторизация</h1>
                <p className="text-balance text-muted-foreground">
                  Войдите в аккаунт
                </p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="m@example.com" required value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a href="#" className="ml-auto text-sm underline-offset-2 hover:underline">
                    Забыли пароль?
                  </a>
                </div>
                <Input id="password" type="password" required value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
              </div>
              <Button type="submit" className="w-full">
                Войти
              </Button>
              <div className="text-center text-sm">
                Нет аккаунта?{" "}
                <a href="/register" className="underline underline-offset-4">
                  Зарегистрируйтесь
                </a>
              </div>
            </div>
          </form>
          <div className="relative hidden bg-muted md:block">
            <img
              src="/promo-people.png"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale" />
          </div>
        </CardContent>
      </Card>
      <Toaster />
    </div>)
  );
}
