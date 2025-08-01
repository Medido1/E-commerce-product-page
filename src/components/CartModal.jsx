import { motion, AnimatePresence } from "framer-motion";
import { GlobalContext } from "../context/GlobalContext";
import { useContext } from "react";
import imgThumb from "../assets/image-product-1-thumbnail.jpg";
import iconDelete from "../assets/icon-delete.svg";

function CartModal() {
  const {showCart,setShowCart, totalOrders, setTotalOrders, isMobile} = useContext(GlobalContext)
  
  const cartAnimation = {
    initial: {y:-100},
    animate: {y: 0},
    transition: { duration: 0.6, ease: "easeOut" },
    exit: {opacity: 0, transition: { duration: 0.6, ease: "easeInOut" }},
  }

  function deleteProduct() {
    setTotalOrders(0)
  }

  function checkOut(){
    setShowCart(false)
    setTotalOrders(0)
  }

  return (
    <AnimatePresence>
      {showCart && 
        <motion.div
          className={`${isMobile ? "top-[10%] left-1/2 -translate-x-1/2": "top-[12%] right-[10%]"}
          rounded-lg max-w-[350px] kumbh_font absolute  bg-white w-[96%] box`}
          {...cartAnimation}
        >
        <h2 className="p-4 mb-4">
          Cart
        </h2>
        <div className="w-full h-0.5 bg-gray-200 mb-4"></div>
        {totalOrders > 0 && 
          <div className="flex flex-col items-center">
            <div className="flex p-4 justify-between self-stretch">
              <img 
                className="h-16"
                src={imgThumb} alt="thumb img" 
              />
              <div className="flex flex-col  gap-2 text-[var(--grayish_blue)]">
                <p>
                  Fall Limited Edition Sneakers
                </p>
                <p>
                  $125.00 x 
                  <span className="mx-2">{totalOrders}</span>
                  <span className="text-[var(--very_dark_blue)]">${parseInt(totalOrders) * 125}.00</span>
                </p>
              </div>
              <button 
                onClick={deleteProduct} 
                aria-label="Delete product"
                title="Remove item"
                className="cursor-pointer"
              >
                <img
                  className="h-5 w-4 my-auto"
                  src={iconDelete} alt="delete product"
                />
              </button>
            </div>
            <button 
              onClick={checkOut}
              className="button rounded-lg mb-8 w-[80%]">
              Checkout
            </button>
          </div>
        }
        {totalOrders === 0 && 
          <p className="block p-4 pb-10 text-lg text-center text-[var(--grayish_blue)]">
            Your cart is empty.
          </p>
        }
      </motion.div>
      }
    </AnimatePresence>
  )
}

export default CartModal