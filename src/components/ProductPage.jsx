import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

import img1 from "../assets/image-product-1.jpg"
import img2 from "../assets/image-product-2.jpg"
import img3 from "../assets/image-product-3.jpg"
import img4 from "../assets/image-product-4.jpg"
import iconNext from "../assets/icon-next.svg";
import iconPrevious from "../assets/icon-previous.svg";

const images = [
  {name: img1, url: img1, id: 1},
  {name: img2, url: img2, id: 2},
  {name: img3, url: img3, id:3},
  {name: img4, url: img4, id:4},
]
  
function ProductPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animation, setAnimation] = useState(null);
  
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
    </div>
  )
}

export default ProductPage;