import './App.css'
import CartModal from './components/CartModal'
import Header from './components/Header'
import NavMenu from './components/NavMenu'
import ProductPage from './components/ProductPage'


function App() {
  return (
    <div className='min-h-screen relative'>
      <Header />
      <NavMenu />
      <ProductPage />
      <CartModal />
    </div>
  )
}

export default App
