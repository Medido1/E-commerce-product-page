import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { motion, AnimatePresence } from "framer-motion";
import iconClose from "../assets/icon-close.svg";

function NavMenu() {
  const { isMenuOpen, isMobile, setIsMenuOpen } = useContext(GlobalContext);

  const navAnimation = {
    initial: { x: -100, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: -100, opacity: 0, transition: { duration: 0.6, ease: "easeInOut" } },
    transition: { duration: 0.6, ease: "easeOut" }
  };
  

  return (
    <AnimatePresence>
      {isMenuOpen && (
        <>
          {isMobile && (
            <motion.div
              className="fixed inset-0  bg-black/25 z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
            />
          )}
          <motion.nav
            className="fixed top-0 left-0 min-h-screen w-[60vw] bg-white z-10"
            {...navAnimation}
            role="navigation"
          >
            <button
              className="absolute top-8 left-6"
              onClick={() => setIsMenuOpen(false)} 
              aria-label={"Close menu"}
            >
          <img 
            src={iconClose} 
            alt={"Close menu"}/>
          </button>
            <ul className="kumbh_font flex flex-col gap-4 pt-20 pl-7 z-20">
              <li><a href="">Collections</a></li>
              <li><a href="">Men</a></li>
              <li><a href="">Women</a></li>
              <li><a href="">About</a></li>
              <li><a href="">Contact</a></li>
            </ul>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
}

export default NavMenu;
