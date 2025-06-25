function NavMenu() {
  const itemClass = `cursor-pointer hover:text-[var(--dark_grayish_blue)]
    relative element `

    const navItems = ["Collections", "Men", "Women", "About", "Contact"];
  return (
    <nav role="navigation">
      <ul className="kumbh_font flex  gap-4  pl-7 z-20 text-[var(--grayish_blue)]">
        {navItems.map(item => 
          <li key={item} className={itemClass}>
            <a href="#">{item}</a>
          </li>
        )}
      </ul>
    </nav>
  )
}

export default NavMenu