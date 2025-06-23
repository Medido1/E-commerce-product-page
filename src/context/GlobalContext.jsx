import { useEffect, useState, createContext } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = (({children}) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 640);

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
    <GlobalContext.Provider value = {{isMobile}}>
      {children}
    </GlobalContext.Provider>
  )
})