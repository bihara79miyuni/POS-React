import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Item from './pages/Item'
import ItemCategory from './pages/ItemCategory'
import Stock from './pages/Stock'
import Transaction from './pages/Transaction'

function App() {
  

  return (
   
      <div>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/items" element={<Item />} />
                <Route path="/itemCategories" element={<ItemCategory />} />
                <Route path="/stocks" element={<Stock />} />
                <Route path="/transactions" element={<Transaction />} />
            </Routes>
        </BrowserRouter>
      </div>
  )
}

export default App
