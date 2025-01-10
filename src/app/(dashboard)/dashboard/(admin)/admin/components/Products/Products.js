'use client'
import ProductCard from "@/app/components/ProductCard/ProductCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";


export default function Products() {
  const[products, setProducts]=useState([])
  useEffect(()=>{
    fetch('/api/products/')
    .then((res)=>{
      return res.json()
    }).then((results)=>{
        const groupedByCategory = results.reduce((acc, product) => {
            const category = product.ProductCategory;
          
            // Если категории еще нет, создаем массив
            if (!acc[category]) {
              acc[category] = [];
            }
          
            // Добавляем продукт в категорию
            acc[category].push(product);
          
            return acc;
          }, {});
      setProducts(groupedByCategory)
      console.log(groupedByCategory)
    })
  },[])
  function EditableDescription({ description, onUpdate }) {
    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState(description);
  
    const handleEditClick = () => setIsEditing(true);
  
    const handleInputChange = (e) => setValue(e.target.value);
  
    const handleBlur = () => {
      setIsEditing(false);
      onUpdate(value); // Обновление значения
    };
  
    return (
      <div className="inline" onClick={handleEditClick}>
        {isEditing ? (
          <textarea
            value={value}
            onChange={handleInputChange}
            onBlur={handleBlur}
            className="field-sizing-content w-full h-max"
          />
        ) : (
          <span>{value || 0}</span>
        )}
      </div>
    );
  }
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null; // Если куки нет
    }
  const handleUpdate = async (productId, field, newValue) => {
    try {
        const token = getCookie('token')
      const response = await fetch(`/api/products/${productId}`, {
        method: 'PATCH', // Используем метод PATCH для частичного обновления
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ [field]: newValue }),
      });
  
      if (!response.ok) {
        throw new Error(`Ошибка при обновлении: ${response.statusText}`);
      }
  
      console.log(`Поле "${field}" для продукта ${productId} успешно обновлено.`);
    } catch (error) {
      console.error('Ошибка при обновлении данных:', error);
    }
  };
  
  
  return (
    <div className="">
        {Object.entries(products).map(([category, items]) => (
            <div key={category}>
                <h2 className="text-xl font-bold">{category}</h2>
                <table class="table-fixed">
                    <thead>
                        <tr>
                            <th className="table-cell text-left bg-stone-200 p-1 w-1/5 border-x border-b border-stone-700">Название</th>
                            <th className="table-cell text-left bg-stone-200 p-1 w-1/5 border-r border-b border-stone-700">Описание</th>
                            <th className="table-cell text-left bg-stone-200 p-1 w-1/5 border-r border-b border-stone-700">Размер S</th>
                            <th className="table-cell text-left bg-stone-200 p-1 w-1/5 border-r border-b border-stone-700">Размер M</th>
                            <th className="table-cell text-left bg-stone-200 p-1 w-1/5 border-r border-b border-stone-700">Размер XL</th>
                            <th className="table-cell text-left bg-stone-200 p-1 w-1/5 border-r border-b border-stone-700">Размер XXL</th>
                            <th className="table-cell text-left bg-stone-200 p-1 w-1/5 border-r border-b border-stone-700">Рейтинг</th>
                            <th className="table-cell text-left bg-stone-200 p-1 w-1/5 border-r border-b border-stone-700">Стоимость</th>
                            <th className="table-cell text-left bg-stone-200 p-1 w-1/5 border-r border-b border-stone-700">Действие</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items?.map((item)=>(
                                <>
                                    <tr key={item?.ProductId} className="table-row">
                                        <td className="table-cell p-1 w-1/5 border-x border-b border-stone-700"><EditableDescription
                                            description={item?.ProductName}
                                            onUpdate={(newProductName) => handleUpdate(item?.ProductId, 'ProductName', newProductName)}
                                        /></td>
                                        <td className="table-cell p-1 w-1/2 border-r border-b border-stone-700" ><EditableDescription
                                            description={item?.ProductDescription}
                                            onUpdate={(newDescription) => handleUpdate(item?.ProductId, 'ProductDescription', newDescription)}
                                        /></td>
                                        <td className="table-cell p-1 w-1/6 text-center border-r border-b border-stone-700">
                                        <EditableDescription
                                            description={item?.ProductSizeS}
                                            onUpdate={(sizeS) => handleUpdate(item?.ProductId, 'ProductSizeS', sizeS)}
                                        />шт.</td>
                                        <td className="table-cell text-center p-1 w-1/6 border-r border-b border-stone-700"><EditableDescription
                                            description={item?.ProductSizeM}
                                            onUpdate={(sizeM) => handleUpdate(item?.ProductId, 'ProductSizeM', sizeM)}
                                        />шт.</td>
                                        <td className="table-cell text-center p-1 w-1/6 border-r border-b border-stone-700"><EditableDescription
                                            description={item?.ProductSizeXL}
                                            onUpdate={(sizeXL) => handleUpdate(item?.ProductId, 'ProductSizeXL', sizeXL)}
                                        />шт.</td>
                                        <td className="table-cell text-center p-1 w-1/6 border-r border-b border-stone-700"><EditableDescription
                                            description={item?.ProductSizeXXL}
                                            onUpdate={(sizeXXL) => handleUpdate(item?.ProductId, 'ProductSizeXXL', sizeXXL)}
                                        />шт.</td>
                                        <td className="table-cell p-1 w-1/6 border-r border-b border-stone-700">{item?.ProductRating}</td>
                                        <td className="table-cell p-1 w-1/5 border-r border-b border-stone-700">
                                            <EditableDescription
                                            description={item?.ProductPrice}
                                            onUpdate={(ProductPrice) => handleUpdate(item?.ProductId, 'ProductPrice', ProductPrice)}
                                        />р</td>
                                        <td className="table-cell p-1 w-1/6 border-r border-b border-stone-700">
                                            <Button className="w-full mb-3">Архивировать</Button>
                                            <Button className="w-full" variant="destructive">Удалить</Button>
                                        </td>
                                    </tr>
                                    <tr className="border-x border-b border-stone-700">
                                        <td colSpan={5} className="">
                                            {item.ProductImagesArray.map((image)=>(
                                                <div className="relative w-20 aspect-square inline-block mr-2" style={{background: `url(${image}) center center/cover no-repeat`}}>
                                                    <div className="absolute top-0 right-0 rounded p-1 bg-slate-200 h-min leading-3 text-red-600 text-xs"><i className="fa-solid fa-x"></i></div>
                                                </div>
                                            ))}
                                        </td>
                                    </tr>
                                </>
                            ))}
                    </tbody>
                </table>
            </div>
        ))}
      {/* {products.map((product)=>(
        <ProductCard catalog={product.ProductCategory} p_key={product.ProductId} name={product.ProductName} price={product.ProductPrice} image={product.ProductImagesArray[0]}/>
      ))} */}
    </div>
  );
}
  