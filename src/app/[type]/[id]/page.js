'use client'
import ProductImages from "@/app/components/ProductImages/ProductImages";
import ProductInfo from "@/app/components/ProductInfo/ProductInfo";
import ReviewItem from "@/app/components/ReviewItem/ReviewItem";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb"
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
  
export default function ProductPage() {
  const[productInfo, setProductInfo] = useState('')
  const pathname = usePathname()
  const lastSegment = pathname.split('/').filter(Boolean).pop()
  useEffect(()=>{
    fetch(`/api/products/${lastSegment}`)
    .then((res)=>{
      return res.json()
    })
    .then((result)=>{
      setProductInfo(result[0])
    })
  },[lastSegment])
  useEffect(()=>{
    console.log("DL",productInfo?.ProductImagesArray)
  },[productInfo])
  return (
    <div className="container mx-auto">
        <Breadcrumb className="my-7">
            <BreadcrumbList>
                <BreadcrumbItem>
                <BreadcrumbLink href="/">Главная</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                <BreadcrumbLink href={"/"+productInfo?.ProductCategory}>{productInfo?.ProductCategory === "pants" ? "Штаны" : productInfo?.ProductCategory === "jacket" ? "Куртки" : "Каталог"}</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                <BreadcrumbPage>{productInfo?.ProductName}</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>

        <div className="flex justify-between">
            <ProductImages images={productInfo?.ProductImagesArray}/>
            <ProductInfo name={productInfo?.ProductName} price={productInfo?.ProductPrice} descr={productInfo?.ProductDescription} sizeS={productInfo?.ProductSizeS} sizeM={productInfo?.ProductSizeM} sizeXL={productInfo?.ProductSizeXL} sizeXXL={productInfo?.ProductSizeXXL}/>
        </div>
        <h2 className="my-3 font-bold text-2xl">Отзывы</h2>
        <div className="flex">
            <ReviewItem/>
        </div>
    </div>
  );
}
