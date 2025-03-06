import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ItemCategoryType from "../types/ItemCategoryType";
import axios from "axios";

function ItemCategory(){
    const [itemCategories, setItemCategories] = useState<ItemCategoryType[]>([]);
    const [itemCategoryName,setItemCategoryName] = useState<string>("");

    async function loadItemCategories() {
        const response = await axios.get("http://localhost:8080/itemCategories");
        setItemCategories(response.data);
    }

    useEffect(function(){
        loadItemCategories();
    },[])

    function handleItemCategoryName(event:any){
        setItemCategoryName(event.target.value);
    }

    async function handleSubmit(){
        const data = {
            name:itemCategoryName
        }
        
        const response = await axios.post("http://localhost:8080/itemCategories",data);
        console.log(response);
        setItemCategoryName("");
        loadItemCategories();
        
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
                    <Link to="/itemCategories" className="relative bg-white-800 p-1 text-blue-900 hover:text-black focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden px-10">ItemCategories</Link>
                    <Link to="/stocks" className="relative bg-white-800 p-1 text-gray-400 hover:text-black focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden px-10">Stocks</Link>
                    <Link to="/transactions" className="relative bg-white-800 p-1 text-gray-400 hover:text-black focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden px-10">Transactions</Link>
                </div >
                <h1>Item Categories</h1>
                <table className="w-full border-separate border-spacing-0 border-none text-left">
                    <thead>
                        <tr>
                            <th>
                            {itemCategories && itemCategories.map(function(itemCategory:ItemCategoryType){
                                return(
                                        <div className="border border-slate-200 py-3 px-4 rounded-lg max-w-auto bg-fuchsia-400">
                                            {itemCategory.name}
                                        </div>
                                )
                            })}
                            </th>
                            <th>
                                <div className="border border-slate-200 py-3 px-4 rounded-lg max-w-700 bg-fuchsia-300">
                                    <form>
                                        <label className="text-slate-600 font-sm block mb-2">ItemCategory Name</label>
                                        <input type="text" className="text-slate-600 font-sm block mb-3 w-full p-2 border border-fuchsia-900 rounded-lg " onChange={handleItemCategoryName} required/>

                                        <button type="button" className="py-3 px-4 bg-fuchsia-800 text-white rounded-lg hover:bg-fuchsia-950 mb-2 text-sm" onClick={handleSubmit}>Create ItemCategory</button>
                                    </form>
                                </div>
                            </th>
                        </tr>
                    </thead>
                </table>
                
                
                
            </div>
        </div>
    )
}

export default ItemCategory;