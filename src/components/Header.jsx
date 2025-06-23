import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import iconClose from "../assets/icon-close.svg";
import iconMenu from "../assets/icon-menu.svg"
import logo from "../assets/logo.svg"
import cartIcon from "../assets/icon-cart.svg";
import avatar from "../assets/image-avatar.png";

function Header() {
  const {isMobile, isMenuOpen, setIsMenuOpen} = useContext(GlobalContext)

  return (
    <header className="flex justify-between z-0 p-6 ">
      <div className="flex items-center gap-4">
        {isMobile && 
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            className="z-20" 
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
          <img 
            src={isMenuOpen ? iconClose : iconMenu} 
            alt={isMenuOpen ? "Close menu" : "Open menu"}/>
          </button>
        }
        <img src={logo} alt="sneakers logo" />
      </div>
      <div className="flex items-center gap-4">
        <button>
          <img src={cartIcon} alt="cart" />
        </button>
        <img 
          className="h-8"
          src={avatar} alt="user avatar" />
      </div>
    </header>
  )
}

export default Header;