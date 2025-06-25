import './App.css'
import CartModal from './components/CartModal'
import Header from './components/Header'
import LightBoxGallery from './components/LightBoxGallery'
import NavMenu from './components/NavMenu'
import ProductPage from './components/ProductPage'

function App() {
  return (
    <div className='min-h-screen relative'>
      <Header />
      <NavMenu />
      <ProductPage />
      <CartModal />
      <LightBoxGallery />
    </div>
  )
}

export default App
