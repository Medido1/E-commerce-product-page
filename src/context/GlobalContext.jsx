import { useEffect, useState, createContext } from "react";
import img1 from "../assets/image-product-1.jpg"
import img2 from "../assets/image-product-2.jpg"
import img3 from "../assets/image-product-3.jpg"
import img4 from "../assets/image-product-4.jpg"
import thumbNail1 from "../assets/image-product-1-thumbnail.jpg";
import thumbNail2 from  "../assets/image-product-2-thumbnail.jpg";
import thumbNail3 from "../assets/image-product-3-thumbnail.jpg";
import thumbNail4 from "../assets/image-product-4-thumbnail.jpg";

export const GlobalContext = createContext();

export const GlobalProvider = (({children}) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 640);
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [totalOrders, setTotalOrders] = useState(0);
  const [showCart, setShowCart] = useState(false);
  const [animation, setAnimation] = useState(null);
  const [isLightBox, setIsLightBox] = useState(false);

  const images = [
    {name: "img1", url: img1, id: 1},
    {name: img2, url: img2, id: 2},
    {name: img3, url: img3, id:3},
    {name: img4, url: img4, id:4},
  ]

  const thumbnails = [
    {name: "thumbNail1", url:thumbNail1, id:1},
    {name: "thumbNail2", url:thumbNail2, id:2},
    {name: "thumbNail3", url:thumbNail3, id:3},
    {name: "thumbNail4", url:thumbNail4, id:4},
  ]

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

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 640);
    };

    handleResize(); // optional, ensures the initial state is accurate
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <GlobalContext.Provider value = {{
      isMobile, isMenuOpen, setIsMenuOpen, totalOrders, setTotalOrders,
      showCart, setShowCart,images, thumbnails, 
      animation, setAnimation, nextAnimation, previousAnimation,
      isLightBox, setIsLightBox}}>
      {children}
    </GlobalContext.Provider>
  )
})