'use client'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { useRouter } from "next/navigation"

export function RegisterForm({
  className,
  ...props
}) {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  function setCookie(name, value, days) {
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    const expiresStr = "expires=" + expires.toUTCString();
    document.cookie = `${name}=${value}; ${expiresStr}; path=/`;
  }
  async function register(e) {
    e.preventDefault();

    if (password === confirmPassword) {
        try {
            const response = await fetch('/api/sign-up', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }),
            });

            const res = await response.json();

            if (response.ok) {
                alert('Успешная регистрация');
                setCookie('token', res.token, 7);
                router.push('/dashboard')
            } else {
                alert(res.message);
            }
        } catch (error) {
            alert('Ошибка: Сервер недоступен.');
        }
    } else {
        alert('Пароли не совпадают');
    }
  }

  return (
    (<div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form onSubmit={(e)=>register(e)} className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Регистрация</h1>
                <p className="text-balance text-muted-foreground">
                  Создайте новый аккаунт
                </p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="name">Имя</Label>
                <Input id="name" placeholder="Имя" required value={name} onChange={(e)=>{setName(e.target.value)}} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="m@example.com" required value={email} onChange={(e)=>{setEmail(e.target.value)}} />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Пароль</Label>
                </div>
                <Input id="password" type="password" required value={password} onChange={(e)=>{setPassword(e.target.value)}} />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password-check">Подтвердите пароль</Label>
                </div>
                <Input id="password-check" type="password" required value={confirmPassword} onChange={(e)=>{setConfirmPassword(e.target.value)}} />
              </div>
              <Button type="submit" className="w-full">
                Зарегистрироваться
              </Button>
              <div className="text-center text-sm">
                Уже зарегистрированы?{" "}
                <a href="/login" className="underline underline-offset-4">
                  Войдите
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
    </div>)
  );
}
