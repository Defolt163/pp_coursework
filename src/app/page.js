import Image from "next/image";
import Promo from "./components/Promo/Promo";
import ProductCard from "./components/ProductCard/ProductCard";
import Catalog from "./components/Catalog/Catalog";

export default function Home() {
  return (
    <div>
      <Promo/>
      <h2 className="text-3xl font-semibold text-center my-14">Каталог</h2>
      <Catalog/>
    </div>
  );
}
