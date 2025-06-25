import { GlobalContext } from "../context/GlobalContext";
import { motion, AnimatePresence } from "framer-motion";
import { useContext, useState } from "react";
import iconCloseWhite from "../assets/icon-close-white.svg"
import iconCloseOrange from "../assets/icon-close-orange.svg"
import iconNext from "../assets/icon-next.svg";
import iconPrevious from "../assets/icon-previous.svg";

function LightBoxGallery() {
  const {images, thumbnails,animation, nextAnimation, previousAnimation,
    isLightBox, setIsLightBox, isMobile, setAnimation
  } = useContext(GlobalContext)
  const [currentIndex, setCurrentIndex] = useState(0);
  const [src, setSrc] = useState(iconCloseWhite);

  const lightBoxAnimation = {
    initial: { scale: 0 },
    animate: { scale: 1, transition: { duration: 0.6, ease: "easeOut" } },
    exit: { scale: 0, transition: { duration: 0.8, ease: "easeOut" } }
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
    <AnimatePresence>
      {isLightBox &&!isMobile && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/75 z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            className="absolute z-30
            w-[400px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            {...lightBoxAnimation}
          >
            <button 
              className="cursor-pointer"
              onClick={() => setIsLightBox(false)}>
              <img 
                className="absolute right-0 -top-4 h-6"
                src={src} alt="close lightbox" 
                onMouseEnter={() => setSrc(iconCloseOrange)}
                onMouseLeave={() => setSrc(iconCloseWhite)}
              />  
            </button>   
            <AnimatePresence mode="wait">
              <motion.img
                className="rounded-xl cursor-pointer"
                key={images[currentIndex].id}
                src={images[currentIndex].url}
                alt={images[currentIndex].name}
                {...animation}
              />
            </AnimatePresence>
            <button 
              onClick={showNextImg} 
              className="absolute top-[40%] -right-6 hover:h-16
                bg-white px-4 py-3 rounded-[50%] cursor-pointer">
                <img
                  src={iconNext} alt="next image" />
            </button>
            <button 
              onClick={showPreviousImg} 
              className="absolute top-[40%] -left-6 hover:h-16
              bg-white px-4 py-3 rounded-[50%] cursor-pointer">
              <img
                src={iconPrevious} alt="previous image" />
            </button>
            <ul className="flex gap-4 mt-4 pb-4">
              {thumbnails.map((thumb, index) => (
                <li 
                  key={thumb.id} 
                  onClick={() => setCurrentIndex(index)}
                  className={`relative ${index === currentIndex ? "selected" : ""}`}>
                    <img 
                      className={`rounded-lg cursor-pointer
                      ${index === currentIndex ? "border-2 border-orange-400" : ""}`}
                      src={thumb.url} alt="thumbnail img" 
                    />
                </li>
              ))}
            </ul>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default LightBoxGallery;