import { GlobalContext } from "../context/GlobalContext";
import { motion, AnimatePresence } from "framer-motion";
import { useContext, useState, useRef, useEffect } from "react";
import iconNext from "../assets/icon-next.svg";
import iconPrevious from "../assets/icon-previous.svg";

function LightBoxGallery() {
  const {images, thumbnails,animation, nextAnimation, previousAnimation,
    isLightBox, setIsLightBox, isMobile, setAnimation
  } = useContext(GlobalContext)
  const [currentIndex, setCurrentIndex] = useState(0);
  const [focusedIndex, setFocusedIndex] = useState(null);

  const lightBoxAnimation = {
    initial: { scale: 0 },
    animate: { scale: 1, transition: { duration: 0.6, ease: "easeOut" } },
    exit: { scale: 0, transition: { duration: 0.8, ease: "easeOut" } }
  }

  function showNextImg() {
    if (currentIndex >= images.length - 1) {
      setCurrentIndex(0);
      setFocusedIndex(0);
    } else {
      setCurrentIndex(currentIndex + 1)
      setFocusedIndex(currentIndex + 1)
    }
    setAnimation(nextAnimation)
  }
  
  function showPreviousImg() {
    if (currentIndex === 0){
      setCurrentIndex(images.length - 1)
      setFocusedIndex(images.length - 1)
    } else {
      setCurrentIndex(currentIndex - 1)
      setFocusedIndex(currentIndex - 1)
    }
    setAnimation(previousAnimation)
  }

  const thumbRefs = useRef([]);

  useEffect(() => {
    if (isLightBox) {
      setFocusedIndex(currentIndex);
    }
  }, [isLightBox]);

  useEffect(() => {
    if (focusedIndex !== null) {
      thumbRefs.current[focusedIndex]?.focus();
    }
  }, [focusedIndex]);

  function handleThumbnailKeyDown(e, index) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setCurrentIndex(index);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      setFocusedIndex((prev) => {
        const nextIndex = prev === thumbnails.length - 1 ? 0 : prev + 1;
        setCurrentIndex(nextIndex); // auto-update image
        return nextIndex;
      });
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      setFocusedIndex((prev) => {
        const nextIndex = prev === 0 || prev === null ? thumbnails.length - 1 : prev - 1;
        setCurrentIndex(nextIndex); // auto-update image
        return nextIndex;
      });
    }
  }

  // use escape key to exit lightbox
  useEffect(() => {
    function handleEscape(e) {
      if (e.key === "Escape") {
        setIsLightBox(false);
      }
    }
    if (isLightBox) {
      window.addEventListener("keydown", handleEscape);
    }
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isLightBox]);
  
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
              onClick={() => setIsLightBox(false)}
              title="exit gallery"
            >
              <img 
                className="close-btn absolute right-0 -top-4 h-6"
                alt="close lightbox" 
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
              title="show next image"
              className="absolute top-[40%] -right-6 hover:h-16
                bg-white px-4 py-3 rounded-[50%] cursor-pointer">
                <img
                  src={iconNext} alt="next image" />
            </button>
            <button 
              onClick={showPreviousImg}
              title="show previous image" 
              className="absolute top-[40%] -left-6 hover:h-16
              bg-white px-4 py-3 rounded-[50%] cursor-pointer">
              <img
                src={iconPrevious} alt="previous image" />
            </button>
            <ul className="flex gap-4 mt-4 pb-4">
              {thumbnails.map((thumb, index) => (
                <li
                  tabIndex={0} 
                  ref={(el) => (thumbRefs.current[index] = el)}
                  onKeyDown={(e) => 
                  handleThumbnailKeyDown(e, index)}
                  key={thumb.id} 
                  onClick={() => {
                    setCurrentIndex(index)
                    setFocusedIndex(index)
                  }}
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