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
import { Progress } from "../../../../@/components/ui/progress";
  
export default function ProductPage() {
  const[productInfo, setProductInfo] = useState('')
  const pathname = usePathname()
  const lastSegment = pathname.split('/').filter(Boolean).pop()
  const [progressValue, setProgressValue] = useState(0)
  const [backdropProgress, setBackdropProgress] = useState('visible')
  useEffect(()=>{
    setBackdropProgress('visible')
    setProgressValue(80)
    fetch(`/api/products/${lastSegment}`)
    .then((res)=>{
      return res.json()
    })
    .then((result)=>{
      setProductInfo(result[0])
      setProgressValue(100)
    }).finally(() => {
      setBackdropProgress('invisible');
    })
  },[lastSegment])
  useEffect(()=>{
    console.log("DL",productInfo?.ProductImagesArray)
  },[productInfo])
  return (
    <>
      <div className="container mx-auto">
          <Breadcrumb className="my-7">
              <BreadcrumbList>
                  <BreadcrumbItem>
                  <BreadcrumbLink href="/">Главная</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                  <BreadcrumbLink href={"/"+productInfo?.ProductCategory}>{productInfo?.ProductCategory === "pants" ? "Штаны" : productInfo?.ProductCategory === "jacket" ? "Куртки" : productInfo?.ProductCategory === "t-shirt" ? "Футболки" : "Каталог"}</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                  <BreadcrumbPage>{productInfo?.ProductName}</BreadcrumbPage>
                  </BreadcrumbItem>
              </BreadcrumbList>
          </Breadcrumb>

          <div className="flex justify-between">
              <ProductImages images={productInfo?.ProductImagesArray}/>
              <ProductInfo id={productInfo?.ProductId} name={productInfo?.ProductName} price={productInfo?.ProductPrice} descr={productInfo?.ProductDescription} sizeS={productInfo?.ProductSizeS} sizeM={productInfo?.ProductSizeM} sizeXL={productInfo?.ProductSizeXL} sizeXXL={productInfo?.ProductSizeXXL}/>
          </div>
          <h2 className="my-3 font-bold text-2xl">Отзывы</h2>
          <div className="flex">
              <ReviewItem/>
          </div>
      </div>
      <div className={`${backdropProgress} fixed w-full h-full top-0 left-0 bg-backdrop flex items-center justify-center`}>
        <Progress className='w-4/5 bg-white' value={progressValue}/>
      </div>
    </>
  );
}
