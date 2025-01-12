'use client'
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { useState } from "react";

export default function ProductInfo(props) {
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null; // Если куки нет
  }
  const [selectedSize, setSelectedSize] = useState('');

  const handleChange = (value) => {
      setSelectedSize(value);
  }
  function addCartItem(){
    const token = getCookie('token');
    fetch(`/api/cart`,{
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        productId: props.id,
        productCount: 1,
        productSize: selectedSize
      })
    }
    )
  }
  
    return (
      <div className="w-full ml-6">
        <h1 className="font-black text-2xl">{props.name}</h1>
        <div className="flex text-xl w-1/5 justify-between items-end text-yellow-500 my-3">
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <h5 className="text-xs ml-1 text-black">5/5</h5>
        </div>
        <h2 className="font-thin text-2xl">{props.price}р</h2>
        <h3 className="font-light text-xs my-3">{props.descr}</h3>
        <div className="h-px w-full bg-stone-400 mb-2"></div>
        <div className="flex">
            <Select onValueChange={handleChange}>
                <SelectTrigger className="w-[180px] mr-3">
                    <SelectValue placeholder="Размер" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                      {props.sizeS != 0 ? <SelectItem value="S">S</SelectItem> : null}
                      {props.sizeM != 0 ? <SelectItem value="M">M</SelectItem> : null}
                      {props.sizeXL != 0 ? <SelectItem value="XL">XL</SelectItem> : null}
                      {props.sizeXXL != 0 ? <SelectItem value="XXL">XXL</SelectItem> : null}
                    </SelectGroup>
                </SelectContent>
            </Select>
            <Button onClick={()=>{addCartItem()}}>В КОРЗИНУ</Button>
        </div>
        
      </div>
    );
  }
  