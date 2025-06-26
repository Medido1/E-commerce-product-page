import { useContext, useState} from "react";
import { GlobalContext } from "../context/GlobalContext";
import ImageGallery from "./ImageGallery";

import iconPlus from "../assets/icon-plus.svg";
import iconMinus from "../assets/icon-minus.svg";
import iconCart from "../assets/icon-cart.svg";

function ProductPage() {
  const [orders, setOrders] = useState(0);
  const {setTotalOrders} = useContext(GlobalContext)
  
  function decrementOrders(){
    if (orders === 0) return;
    setOrders(prev => prev - 1)
  }

  function addToCart() {
    setTotalOrders(prev => prev + orders)
    setOrders(0)
  }

  return (
    <div className="md:mt-[2%] lg:flex lg:justify-center lg:gap-16 ">
      <ImageGallery />
      <div className="p-4 kumbh_font lg:w-[32%]  lg:mt-[2%]">
        <p className="uppercase tracking-widest text-[var(--dark_grayish_blue)]">
          Sneaker Company
        </p>
        <h1 className="text-3xl lg:text-4xl my-2 lg:my-4 text-[var(--very_dark_blue)]">
          Fall Limited Edition Sneakers
        </h1>
        <p className="text-[var(--grayish_blue)] mb-4">
          These low-profile sneakers are your perfect casual wear companion. Featuring a 
          durable rubber outer sole, they’ll withstand everything the weather can offer.
        </p>
        <div className="flex lg:flex-col justify-between items-center lg:items-start mb-8">
          <p className="text-3xl lg:text-2xl">$125.00
            <span className="ml-4 text-white text-lg lg:text-md bg-black rounded-lg px-2 py-1">
              50%
            </span>
          </p>
          <p className="text-[var(--dark_grayish_blue)]">
            <s>$250.00</s>
          </p>
        </div>
        <div className="lg:flex lg:items-center lg:gap-4">
          <div className="flex justify-between lg:items-center lg:py-4
            bg-[var(--light_grayish_blue)] px-4 py-2 rounded-lg lg:w-[40%]">
            <button
              className="cursor-pointer"
              onClick={() => setOrders(prev => prev + 1)}
              aria-label="Increase quantity"
              title="Increase quantity"
            >
              <img src={iconPlus} />
            </button>
            <p>{orders}</p>
            <button
              className="cursor-pointer"
              onClick={decrementOrders}
              aria-label="Decrease quantity"
              title="Decrease quantity"
            >
              <img src={iconMinus} />
            </button>
          </div>
          <button
            onClick={addToCart}
            className="button btn_shadow flex justify-center items-center gap-4
              w-full lg:w-[60%] mt-4 mb-10 lg:my-0 text-black rounded-lg  py-4 lg:py-3">
            <img src={iconCart} alt="cart icon" />
            <p>Add to Cart</p>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductPage;