function NavMenu() {
  const itemClass = `cursor-pointer hover:text-[var(--dark_grayish_blue)]
     relative element `
  return (
    <nav>
      <ul className="kumbh_font flex  gap-4  pl-7 z-20 text-[var(--grayish_blue)]">
        <li className={itemClass}>Collections</li>
        <li className={itemClass}>Men</li>
        <li className={itemClass}>Women</li>
        <li className={itemClass}>About</li>
        <li className={itemClass}>Contact</li>
      </ul>
    </nav>
  )
}

export default NavMenu