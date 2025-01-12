'use client'
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { UploadButton } from "@uploadthing/react";
import ProductCard from "../ProductCard/ProductCard";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useRouter } from "next/navigation";
import { Progress } from "../../../../@/components/ui/progress";


export default function AddProduct() {
  const router = useRouter()
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null; // Если куки нет
  }

  const [sizes, setSizes] = useState({
    sizeS: '',
    sizeM: '',
    sizeXL: '',
    sizeXXL: '',
  })
  const handleChange = (event) => {
    const { id, value } = event.target;
    setSizes((prevSizes) => ({
      ...prevSizes,
      [id]: value, // Обновляем соответствующее поле
    }));
  };


  const [productName, setProductName] = useState('')
  const [productDescr, setProductDescr] = useState('')
  const [productCategory, setProductCategory] = useState('')
  const [productPrice, setProductPrice] = useState('')
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isSuccessDialogOpen, setSuccessDialogOpen] = useState(false)
  const [isErrorDialogOpen, setErrorDialogOpen] = useState(false)
  const [progressValue, setProgressValue] = useState(0)
  const [backdropProgress, setBackdropProgress] = useState('invisible')

  const handleCategoryChange = (value) => {
    setProductCategory(value); // Обновляем состояние выбранной категории
  }
  const handleFileChange = (event) => {
    // Получаем все выбранные файлы
    setSelectedFiles(event.target.files);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!productCategory) {
      alert('Пожалуйста, выберите категорию!');
      return;
    }
    setBackdropProgress('visible')
    const token = getCookie('token');
  
    const sizesArray = Object.values(sizes).filter(size => size !== ''); // Фильтруем пустые значения
    console.log(sizesArray);
  
    const formData = new FormData();
    setProgressValue(30)
    // Добавляем данные в FormData
    formData.append('name', productName);
    formData.append('descr', productDescr);
    formData.append('category', productCategory);
    formData.append('price', productPrice);
    formData.append('sizes', sizesArray);
  
    Array.from(selectedFiles).forEach((file, index) => {
      formData.append('files', file); // "files" — это имя поля на сервере, через которое будет получен массив файлов
    });
    console.log('data', formData);
    setProgressValue(80)
    try {
      await fetch('/api/products/add', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData
      }).then(() => {
        // Обнуление полей формы
        setProductName('');          // Обнуление названия продукта
        setProductDescr('');         // Обнуление описания продукта
        setProductCategory('');      // Обнуление категории
        setProductPrice('');         // Обнуление цены
        setSizes({                   // Обнуление размеров
          sizeS: '',
          sizeM: '',
          sizeXL: '',
          sizeXXL: '',
        });
        setSelectedFiles([]);        // Обнуление файлов
  
        // Сброс input[type="file"] вручную
        document.getElementById('picture').value = ''; 
        setProgressValue(100)
        setBackdropProgress('invisible')
        setSuccessDialogOpen(true);
      }).catch(() => {
        setBackdropProgress('invisible')
        setErrorDialogOpen(true);
      });
    } catch (error) {
      console.error('Error uploading files:', error);
    }
  };
  
    return (
      <>
        <div className="flex gap-4">
          <form onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="name">Наименование</Label>
              <Input required id='name' value={productName} onChange={(e)=>{setProductName(e.target.value)}}/>
            </div>
            <div>
              <Label htmlFor="category">Категория</Label>
              <Select required value={productCategory} onValueChange={handleCategoryChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Выберите категорию" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pants">Штаны</SelectItem>
                  <SelectItem value="jacket">Куртки</SelectItem>
                  <SelectItem value="t-shirt">Футболки</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="description">Описание</Label>
              <Textarea required id='description' value={productDescr} onChange={(e)=>{setProductDescr(e.target.value)}}/>
            </div>
            <h2 className="font-bold">Размеры и количество:</h2>
            <div className="flex gap-1">
              <div className="flex items-center mb-1">
                <Label htmlFor="sizeS" className="mr-1">S</Label>
                <Input required type='number' id="sizeS" value={sizes.sizeS} onChange={handleChange} />
              </div>
              <div className="flex items-center">
                <Label htmlFor="sizeM" className="mr-1">M</Label>
                <Input required type='number' id="sizeM" value={sizes.sizeM} onChange={handleChange} />
              </div>
              <div className="flex items-center">
                <Label htmlFor="sizeXL" className="mr-1">XL</Label>
                <Input required type='number' id="sizeXL" value={sizes.sizeXL} onChange={handleChange} />
              </div>
              <div className="flex items-center">
                <Label htmlFor="sizeXXL" className="mr-1">XXL</Label>
                <Input required id="sizeXXL" type='number' value={sizes.sizeXXL} onChange={handleChange} />
              </div>
            </div>
            <div>
              <Label htmlFor="price">Стоимость (р)</Label>
              <Input required id='price' type='number' value={productPrice} onChange={(e)=>{setProductPrice(e.target.value)}}/>
            </div>
            <h2 className="font-bold my-2">Изображения:</h2>
            <Input required className='w-max-sm mb-2' id="picture" type="file" accept="image/png, image/jpeg" multiple onChange={handleFileChange}/>
            <Button type="submit">Загрузить</Button>
          </form>
          <ProductCard image='https://avatars.mds.yandex.net/i?id=c55974d6cc7905d8b4e85361974d245a_l-10471168-images-thumbs&n=13' name={productName} price={productPrice}/>
        </div>
        <AlertDialog open={isSuccessDialogOpen} onOpenChange={setSuccessDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Товар добавлен</AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={()=>{setProgressValue(0)}}>Закрыть</AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <AlertDialog open={isErrorDialogOpen} onOpenChange={setErrorDialogOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                <AlertDialogTitle>Ошибка</AlertDialogTitle>
                <AlertDialogDescription>
                    Произошла ошибка сервера
                </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogAction className="bg-red-700" onClick={()=>{setProgressValue(0)}}>Продолжить</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
        <div className={`${backdropProgress} fixed w-full h-full top-0 left-0 bg-backdrop flex items-center justify-center`}>
          <Progress className='w-4/5 bg-white' value={progressValue}/>
        </div>
      </>
    );
  }