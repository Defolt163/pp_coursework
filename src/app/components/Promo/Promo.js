import { Button } from "@/components/ui/button";

export default function Promo(){
    return(
        <section className="bg-promo-50 w-full pt-6 text-black">
            <div className="container mx-auto flex justify-between">
                <div className="w-1/2">
                    <h1 className="text-6xl font-black">FIND CLOTHES THAT MATCHES YOUR STYLE</h1>
                    <h2 className="text-stone-800">Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.</h2>
                    <Button className="my-8">Подробнее...</Button>
                    <div className="flex mt-4 justify-between">
                        <div>
                            <h3 className="text-5xl text-extrabold">200+</h3>
                            <h3>Известных брендов</h3>
                        </div>
                        <div className="h-auto w-px bg-slate-400 mx-6"></div>
                        <div className="px-2">
                            <h3 className="text-5xl text-extrabold">2,000+</h3>
                            <h3>Качественных товаров</h3>
                        </div>
                        <div className="h-auto w-px bg-slate-400 mx-6"></div>
                        <div>
                            <h3 className="text-5xl text-extrabold">30,000+</h3>
                            <h3>Довольных клиентов</h3>
                        </div>
                    </div>
                </div>
                <div className="w-1/2">
                    <img src="/promo-people.png" alt="two people"/>
                </div>
            </div>
        </section>
    )
}