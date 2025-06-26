import { GlobalContext } from "../context/GlobalContext";
import { motion, AnimatePresence } from "framer-motion";
import { useContext, useState, useRef, useEffect } from "react";
import iconNext from "../assets/icon-next.svg";
import iconPrevious from "../assets/icon-previous.svg";

function ImageGallery() {
  const {isMobile,images, thumbnails,
    animation,setAnimation, nextAnimation, 
    previousAnimation, setIsLightBox
  } = useContext(GlobalContext)
  const [currentIndex, setCurrentIndex] = useState(0);

  const [focusedIndex, setFocusedIndex] = useState(null);
  const thumbRefs = useRef([]);

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
    <div className="relative lg:w-[28%]">
      <AnimatePresence mode="wait">
        <motion.img
          onClick={() => setIsLightBox(true)}
          className="rounded-xl relative cursor-pointer"
          key={images[currentIndex].id}
          src={images[currentIndex].url}
          alt={images[currentIndex].name}
          {...animation}
        />
      </AnimatePresence>
      {!isMobile && 
        <ul className="flex gap-4 mt-4 pb-4">
          {thumbnails.map((thumb, index) => (
            <li 
              key={thumb.id} 
              className={`relative ${index === currentIndex ? "selected" : ""}`}
              tabIndex={0}
              onClick={() => setCurrentIndex(index)}
              ref={(el) => (thumbRefs.current[index] = el)}
              onKeyDown={(e) => 
                handleThumbnailKeyDown(e, index, thumbnails, setCurrentIndex, setFocusedIndex)}
            >
              <img 
                className={`rounded-lg cursor-pointer
                  ${index === currentIndex ? "border-2 border-orange-400" : ""}`}
                src={thumb.url} alt="thumbnail img" />
            </li>
          ))}
        </ul>}
      <button 
        onClick={showNextImg} 
        title="show next image"
        className="lg:hidden absolute top-[40%] right-2 bg-white px-4 py-3 rounded-[50%]">
        <img src={iconNext} alt="next image" />
      </button>
      <button 
        onClick={showPreviousImg} 
        title="show previous image"
        className="lg:hidden absolute top-[40%] left-2 bg-white px-4 py-3 rounded-[50%]">
        <img
          src={iconPrevious} alt="previous image" />
      </button>
    </div>
  )
}

export default ImageGallery;