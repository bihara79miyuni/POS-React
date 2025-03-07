import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Item from './pages/Item'
import ItemCategory from './pages/ItemCategory'
import Stock from './pages/Stock'
import Transaction from './pages/Transaction'
import Login from './pages/auth/Login'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  

  return (
   
    <AuthProvider>
        <BrowserRouter>
            <Routes>
              <Route element={<ProtectedRoute />}>
                <Route path="/" element={<Home />} />
                <Route path="/items" element={<Item />} />
                <Route path="/itemCategories" element={<ItemCategory />} />
                <Route path="/stocks" element={<Stock />} />
                <Route path="/transactions" element={<Transaction />} />
               
              </Route>
              <Route path="/auth/login" element={<Login />} />
            </Routes>
        </BrowserRouter>
    </AuthProvider>  
  )
}

export default App
