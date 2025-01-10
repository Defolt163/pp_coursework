'use client'

import { useEffect, useState } from "react";

export default function ProductImages(props) {
    const bgs = props.images
    const [activeImage, setActiveImage] = useState(bgs?.[0])
    useEffect(()=>{
      setActiveImage(bgs?.[0])
    },[bgs])
    return (
      <div className="flex">
          <div className="w-36 mr-4">
            {bgs?.map((image)=>(
              <div key={image} onClick={()=>{setActiveImage(image)}} className="w-full rounded-xl aspect-square mb-2" style={{background: `url(${image}) center center/cover no-repeat`}}></div>
            ))}
                {/* <div onClick={()=>{setActiveImage(bgs?.[0])}} className="w-full rounded-xl aspect-square mb-2" style={{background: `url(${bgs?.[0]}) center center/cover no-repeat`}}></div>
                <div onClick={()=>{setActiveImage(bgs?.[1])}} className="w-full rounded-xl aspect-square mb-2" style={{background: `url(${bgs?.[1]}) center center/cover no-repeat`}}></div>
                <div onClick={()=>{setActiveImage(bgs?.[2])}} className="w-full rounded-xl aspect-square" style={{background: `url(${bgs?.[2]}) center center/cover no-repeat`}}></div> */}
          </div>
        <div className="w-96 rounded-xl aspect-square" style={{background: `url(${activeImage}) center center/cover no-repeat`}}></div>
      </div>
    );
  }
  