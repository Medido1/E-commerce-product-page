import { useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";
import iconMenu from "../assets/icon-menu.svg"
import logo from "../assets/logo.svg"
import cartIcon from "../assets/icon-cart.svg";
import avatar from "../assets/image-avatar.png";
import NavMenuDesktop from "./NavMenuDesktop";

function Header() {
  const {isMobile, setIsMenuOpen, totalOrders
    ,showCart, setShowCart
  } = useContext(GlobalContext)

  return (
    <header className="flex justify-between z-0 p-6 md:px-12 lg:px-16 xl:px-22 relative">
      <div className="flex items-center gap-4 lg:ml-32">
        {isMobile && 
          <button
            onClick={() => setIsMenuOpen(true)}  
            aria-label={"Open menu"}
          >
          <img 
            src={iconMenu} 
            alt={"Open menu"}/>
          </button>
        }
        <img src={logo} alt="sneakers logo" />
        {!isMobile && <NavMenuDesktop />}
      </div>
      <div className="flex items-center gap-4 lg:gap-8 lg:mr-4">
        <button 
          onClick={() => setShowCart(!showCart)}
          className="relative cursor-pointer">
          <img className="h-8 lg:h-6" src={cartIcon} alt="cart" />
          {totalOrders > 0 && 
            <p className="text-white px-2.5 lg:px-2 text-sm rounded-full bg-[var(--orange)]
              absolute -top-2 -right-2 ">
              {totalOrders}
            </p>
          }
        </button>
        <img 
          className="h-8 lg:h-14 hover:border-orange-400 
          hover:border-4 rounded-[50%] cursor-pointer"
          src={avatar} alt="user avatar" />
      </div>
      {!isMobile &&
        <div 
          className="absolute -bottom-2 h-0.5 bg-[var(--light_grayish_blue)]  w-[94%]">
        </div>
      }
    </header>
  )
}

export default Header;