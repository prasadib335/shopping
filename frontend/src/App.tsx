
import './App.css'
import { Route, Routes } from 'react-router'
import ProductCardPage from './pages/ProductCardPage'
import ProductsPage from './pages/ProductsPage'
import CartPage from './pages/CartPage'
import OrdersPage from './pages/OrdersPage'
import OrderDetailsPage from './pages/OrderDetailsPage'
import Login from './pages/Login';
import Register from './pages/Register';
import ProfilePage from './pages/ProfilePage'

function App() {
  
  return (
    <>
        <Routes>
           <Route path='/' element = {<Login/>} />
           <Route path = '/register' element = {<Register/>} />
           <Route path = '/profile' element = {<ProfilePage/>} />
           <Route path ='products/:id' element = {<ProductCardPage/>}/>
           <Route path ='products' element = {<ProductsPage/>}/>
           <Route path = 'cart' element = {<CartPage/>}/>
           <Route path='orders' element = {<OrdersPage/>}/>
           <Route path='orders/:id' element = {<OrderDetailsPage/>} />
        </Routes>
    </>
  )
}

export default App
