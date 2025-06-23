import './App.css'
import Header from './components/Header'
import NavMenu from './components/NavMenu'
import ProductPage from './components/ProductPage'


function App() {
  return (
    <div className='min-h-screen relative'>
      <Header />
      <NavMenu />
      <ProductPage />
    </div>
  )
}

export default App
