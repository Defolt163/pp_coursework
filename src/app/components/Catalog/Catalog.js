'use client'
import { useEffect, useState } from "react";
import ProductCard from "../ProductCard/ProductCard";

export default function Catalog() {
  const[products, setProducts]=useState([])
  useEffect(()=>{
    fetch('/api/products/')
    .then((res)=>{
      return res.json()
    }).then((results)=>{
      setProducts(results)
      console.log(results)
    })
  },[])
  return (
    <div className="container mx-auto flex flex-wrap gap-3">
      {products && products.length !== undefined ? products.map((product)=>(
          <ProductCard key={product.ProductId} catalog={product.ProductCategory} p_key={product.ProductId} name={product.ProductName} price={product.ProductPrice} image={product.ProductImagesArray[0]}/>
      )) : <div className="mx-auto font-bold text-xl mb-32">Ошибка сервера. Но мы уже работаем над этим...</div>}
    </div>
  );
}
  