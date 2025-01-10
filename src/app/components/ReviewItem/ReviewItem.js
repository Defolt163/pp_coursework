

export default function ReviewItem() {
    return (
      <div className="border-solid border-stone-300 border rounded-xl w-1/2 p-5">
        <div className="flex text-xs w-2/12 justify-between text-yellow-500">
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
        </div>
        <h2 className="mt-3 mb-1 font-semibold text-lg">Имя М</h2>
        <h3 className="font-light mb-2 text-xs text-stone-500">"I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It's become my favorite go-to shirt."</h3>
        <h3 className="font-light text-xs text-stone-400">Posted on August 14, 2023</h3>
      </div>
    );
  }
  