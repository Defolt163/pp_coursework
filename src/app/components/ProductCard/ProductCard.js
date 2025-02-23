import Link from "next/link";

export default function ProductCard(props) {
  return (
    <Link href={"/"+props.catalog+"/"+props.p_key} key={props.p_key} className="rounded-xl product_card__catalog overflow-hidden">
        <div className="w-full aspect-square overflow-hidden" style={{background: `url(${props.image}) center center/cover no-repeat`}}></div>
        <h2 className="text-black my-1">{props.name}</h2>
        <div className="my-1 flex text-xs text-yellow-500">
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <h5 className="text-xs ml-1 text-black">5/5</h5>
        </div>
        <h2 className="font-semibold text-2xl">{props.price}р</h2>
    </Link>
  );
}
