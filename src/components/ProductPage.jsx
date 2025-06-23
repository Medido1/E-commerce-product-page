import { motion, AnimatePresence } from "framer-motion";
import { useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";

import img1 from "../assets/image-product-1.jpg"
import img2 from "../assets/image-product-2.jpg"
import img3 from "../assets/image-product-3.jpg"
import img4 from "../assets/image-product-4.jpg"
import iconNext from "../assets/icon-next.svg";
import iconPrevious from "../assets/icon-previous.svg";
import iconPlus from "../assets/icon-plus.svg";
import iconMinus from "../assets/icon-minus.svg";
import iconCart from "../assets/icon-cart.svg";

const images = [
  {name: img1, url: img1, id: 1},
  {name: img2, url: img2, id: 2},
  {name: img3, url: img3, id:3},
  {name: img4, url: img4, id:4},
]
  
function ProductPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animation, setAnimation] = useState(null);
  const {orders, setOrders} = useContext(GlobalContext)
  
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

  const nextAnimation = {
    initial: {x: -100, opacity: 0},
    animate: { x:0, opacity: 1},
    transition: { duration: 0.6, ease: "easeOut" }
  }

  const previousAnimation = {
    initial: {x: 100, opacity: 0},
    animate: { x:0, opacity: 1},
    transition: { duration: 0.6, ease: "easeOut" }
  }

  function decrementOrders(){
    if (orders === 0) return;
    setOrders(prev => prev - 1)
  }

  return (
    <div>
      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.img
            key={images[currentIndex].id}
            src={images[currentIndex].url}
            alt={images[currentIndex].name}
            {...animation}
          >
          </motion.img>
        </AnimatePresence>
        <button 
          onClick={showNextImg} 
          className="absolute top-[40%] right-2 bg-white px-4 py-3 rounded-[50%]">
          <img
            src={iconNext} alt="next image" />
        </button>
        <button 
          onClick={showPreviousImg} 
          className="absolute top-[40%] left-2 bg-white px-4 py-3 rounded-[50%]">
          <img
            src={iconPrevious} alt="previous image" />
        </button>
      </div>
      <div className="p-4 kumbh_font">
        <p className="uppercase tracking-widest text-[var(--dark_grayish_blue)]">
          Sneaker Company
        </p>
        <h1 className="text-3xl my-2 text-[var(--very_dark_blue)]">
          Fall Limited Edition Sneakers
        </h1>
        <p className="text-[var(--grayish_blue)] mb-4">
          These low-profile sneakers are your perfect casual wear companion. Featuring a 
          durable rubber outer sole, they’ll withstand everything the weather can offer.
        </p>
        <div className="flex justify-between items-center mb-8">
          <p className="text-3xl">$125.00
            <span className="ml-4 text-white text-lg bg-black rounded-lg px-2 py-1">50%</span>
          </p>
          <p className="text-[var(--dark_grayish_blue)]">
            <s>$250.00</s>
          </p>
        </div>
        <div className="flex justify-between bg-[var(--light_grayish_blue)] px-4 py-2 rounded-lg">
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
          className="button flex justify-center items-center gap-4 w-full mt-4 text-black
          rounded-lg mb-10">
          <img src={iconCart} alt="cart icon" />
          <p>Add to Cart</p>
        </button>
      </div>
    </div>
  )
}

export default ProductPage;