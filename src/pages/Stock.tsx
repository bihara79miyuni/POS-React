import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import StockType from "../types/StockType";
import axios from "axios";
import ItemType from "../types/ItemType";
import { useAuth } from "../context/AuthContext";

function Stock(){

     const { isAuthenticated, jwtToken } = useAuth();
        
        
    const config = {
        headers: {
            Authorization: `Bearer ${jwtToken}`
        }
    }

    const [items,setItems] = useState<ItemType[]>([]);
    const[stocks,setStocks] = useState<StockType[]>([]);
    const[quantity,setQuantity] = useState<number>(0);
    const[itemId,setItemId] = useState<number>();

    async function loadStocks(){
        const response = await axios.get("http://localhost:8080/stocks",config);
        setStocks(response.data);
    }

    async function loadItems() {
        const response = await axios.get("http://localhost:8080/items",config)
        setItems(response.data);
    }

    useEffect(function(){
        if(isAuthenticated){
            loadStocks();
            loadItems();
        }   
    },[isAuthenticated])

    function handleQuantity(event:any){
        setQuantity(event.target.value);
    }

    function handleItemId(event:any){
        setItemId(event.target.value);
    }

    async function handleSubmit(){
        const data = {
            quantity:quantity,
            itemId:itemId
        }

        const response = await axios.post("http://localhost:8080/stocks",data,config);
        console.log(response);
        loadStocks();
    }


    return(
        <div>
            <div className="container mx-auto pt-5 pb-5 font-bold">
                <div className="bg-fuchsia-200">
                    <h1 className="text-3xl text-center text-blue-900">Sales  System</h1>
                </div>
                <div className="bg-fuchsia-300">
                    <Link to="/" className="relative bg-white-800 p-1 text-gray-400 hover:text-black focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden px-10 py-10">Home</Link>
                    <Link to="/items" className="relative bg-white-800 p-1 text-gray-400 hover:text-black focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden px-10 py-10">Sale Items</Link>
                    <Link to="/itemCategories" className="relative bg-white-800 p-1 text-gray-400 hover:text-black focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden px-10">ItemCategories</Link>
                    <Link to="/stocks" className="relative bg-white-800 p-1 text-blue-900 hover:text-black focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden px-10">Stocks</Link>
                    <Link to="/transactions" className="relative bg-white-800 p-1 text-gray-400 hover:text-black focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden px-10">Transactions</Link>
                </div>
                <h1>Item Stocks</h1>
                
                                <div className="border border-slate-200 py-3 px-4 rounded-lg max-w-700 bg-fuchsia-300">
                                    <form>
                                        <label className="text-slate-600 font-sm block mb-2">Stock Quantity</label>
                                        <input type="text" className="text-slate-600 font-sm block mb-3 w-full p-2 border border-fuchsia-900 rounded-lg " value={quantity} onChange={handleQuantity} required/>

                                        <label className="text-slate-600 font-sm block mb-2">Item Name</label>
                                        <select className="text-slate-600 font-sm block mb-3 w-full p-2 border border-slate-300 rounded-lg" value={itemId} onChange={handleItemId}>
                                        {items.map(function(item){
                                            return(
                                                <option value={item.id}>{item.name}</option>
                                                
                                )
                            })}
                                        </select>
                                        <button type="button" className="py-3 px-4 bg-fuchsia-800 text-white rounded-lg hover:bg-fuchsia-950 mb-2 text-sm"onClick={handleSubmit}>Create Stock</button>
                                    </form>
                                </div>
                
                        <table className="w-full border-separate border-spacing-0 border-none text-left">
                        <thead>
                        <tr>
                            <td>Stock Id</td>
                            <th>Item Id</th>
                            <th>Quantity</th>
                            <th>UpdatedAt</th>
                        </tr>
                        </thead>
                        <tbody>
                            {stocks.map(function(stock){
                                return(
                                    <tr>
                                        <td>{stock.id}</td>
                                        <td>{stock.item?.id}</td>
                                        <td>{stock.quantity}</td>
                                        <td>{stock.updatedAt}</td>
                                    </tr>
                                )
                            })}
                        </tbody>

                        </table>
                    
                
                
            </div>
        </div>
    )
}

export default Stock;