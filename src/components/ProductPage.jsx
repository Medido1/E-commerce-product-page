import { motion, AnimatePresence } from "framer-motion";
import { useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";

import iconNext from "../assets/icon-next.svg";
import iconPrevious from "../assets/icon-previous.svg";
import iconPlus from "../assets/icon-plus.svg";
import iconMinus from "../assets/icon-minus.svg";
import iconCart from "../assets/icon-cart.svg";

function ProductPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [orders, setOrders] = useState(0);
  const {setTotalOrders, isMobile,images, thumbnails,
    animation,setAnimation, nextAnimation, previousAnimation,
    setIsLightBox
  } = useContext(GlobalContext)
  
  function decrementOrders(){
    if (orders === 0) return;
    setOrders(prev => prev - 1)
  }

  function addToCart() {
    setTotalOrders(prev => prev + orders)
    setOrders(0)
  }

  function showNextImg() {
    if (currentIndex >= images.length - 1) {
      setCurrentIndex(0)
    } else {
      setCurrentIndex(currentIndex + 1)
    }
    setAnimation(nextAnimation)
  }
  
  function showPreviousImg() {
    if (currentIndex === 0){
      setCurrentIndex(images.length - 1)
    } else {
      setCurrentIndex(currentIndex - 1)
    }
    setAnimation(previousAnimation)
  }

  return (
    <div className="md:mt-[2%] lg:flex lg:justify-center lg:gap-16 ">
      <div className="relative lg:w-[28%]">
        <AnimatePresence mode="wait">
          <motion.img
            onClick={() => setIsLightBox(true)}
            className="rounded-xl relative cursor-pointer"
            key={images[currentIndex].id}
            src={images[currentIndex].url}
            alt={images[currentIndex].name}
            {...animation}
          >
          </motion.img>
        </AnimatePresence>
        {!isMobile && 
          <ul className="flex gap-4 mt-4 pb-4">
            {thumbnails.map((thumb, index) => (
              <li 
                key={thumb.id} 
                className={`relative ${index === currentIndex ? "selected" : ""}`}>
                <img 
                  onClick={() => setCurrentIndex(index)}
                  className={`rounded-lg cursor-pointer
                    ${index === currentIndex ? "border-2 border-orange-400" : ""}`}
                  src={thumb.url} alt="thumbnail img" />
              </li>
            ))}
          </ul>
        }
        <button 
          onClick=
          {showNextImg} 
          className="lg:hidden absolute top-[40%] right-2 bg-white px-4 py-3 rounded-[50%]">
          <img
            src={iconNext} alt="next image" />
        </button>
        <button 
          onClick={showPreviousImg} 
          className="lg:hidden absolute top-[40%] left-2 bg-white px-4 py-3 rounded-[50%]">
          <img
            src={iconPrevious} alt="previous image" />
        </button>
      </div>
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
              onClick={() => setOrders(prev => prev + 1)}>
              <img src={iconPlus} alt="add item" />
            </button>
            <p>{orders}</p>
            <button
              className="cursor-pointer"
              onClick={decrementOrders}
            >
              <img src={iconMinus} alt="remove item" />
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