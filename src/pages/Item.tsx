import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ItemType from "../types/ItemType";
import axios from "axios";
import ItemCategoryType from "../types/ItemCategoryType";
import { useAuth } from "../context/AuthContext";

function Item(){
    const { isAuthenticated, jwtToken } = useAuth();


    const config = {
        headers: {
            Authorization: `Bearer ${jwtToken}`
        }
    }

    const [items,setItems] = useState<ItemType[]>([]);

    const[itemName,setItemName] = useState<string>("");
    const[description,setDescription] = useState<string>("");
    const[price,setPrice] = useState<number>(0.0);
    const[itemCategoryId,setItemCategoryId] = useState<number>();
    const[itemCategories,setItemCategories] = useState<ItemCategoryType[]>([]);

    
    async function loadItems() {
        const response = await axios.get("http://localhost:8080/items",config)
        setItems(response.data);
    }

    async function loadItemCategories(){
        const response = await axios.get("http://localhost:8080/itemCategories",config)
        setItemCategories(response.data);
    }

    useEffect(function(){
        if (isAuthenticated){
        loadItems();
        loadItemCategories();
        }
        
    },[isAuthenticated])

    function handleItemName(event: any){
        setItemName(event.target.value);
    }

    function handleDescription(event:any){
        setDescription(event.target.value);
    }

    function handlePrice(event:any){
        setPrice(event.target.value);
    }

    function handleCategoryId(event:any){
        setItemCategoryId(event.target.value);
    }

    async function handleSubmit(){
        const data = {
            name:itemName,
            description:description,
            price:price,
            itemCategoryId:itemCategoryId
        }
        try{
            await axios.post("http://localhost:8080/items",data);
            loadItems();
            setItemName("");
            setDescription("");
            setPrice(0);
            setItemCategoryId(0);
        }catch(error:any){
            console.log(error);
        }
    }


    const[itemEditing,setItemEditing] = useState<ItemType| null>(null);

    function editItem(item:ItemType){
        setItemEditing(item);
        setItemName(item.name);
        setDescription(item.description);
        setPrice(item.price);
        setItemCategoryId(item.itemCategory?.id);
    }

    async function updateItem(){
        const data = {
            name:itemName,
            description:description,
            price:price,
            itemCategoryId:itemCategoryId
        }

        try{
            await axios.put(`http://localhost:8080/items/${itemEditing?.id}`,data);
            setItemEditing(null);
            loadItems();
            setItemName("");
            setDescription("");
            setPrice(0);
            setItemCategoryId(0);
        }catch(error){
            console.log(error);
        }
    }

    async function deleteItem(itemId:number){
        try{
            await axios.delete(`http://localhost:8080/items/${itemId}`);
            loadItems();
        }catch(error){
            console.log(error);
        }
    }

    

    return(
        <div>
            <div className="container mx-auto pt-5 pb-5 font-bold">
                <div className="bg-fuchsia-200">
                    <h1 className="text-3xl text-center text-blue-900">Sales  System</h1>
                </div>
                <div className="bg-fuchsia-300">
                    <Link to="/" className="relative bg-white-800 p-1 text-gray-400 hover:text-black focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden px-10 py-10">Home</Link>
                    <Link to="/items" className="relative bg-white-800 p-1 text-blue-900 hover:text-black focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden px-10 py-10">Sales Items</Link>
                    <Link to="/itemCategories" className="relative bg-white-800 p-1 text-gray-400 hover:text-black focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden px-10">ItemCategories</Link>
                    <Link to="/stocks" className="relative bg-white-800 p-1 text-gray-400 hover:text-black focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden px-10">Stocks</Link>
                    <Link to="/transactions" className="relative bg-white-800 p-1 text-gray-400 hover:text-black focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden px-10">Transactions</Link>
                </div>
                <div className="container mx-auto pt-5 pb-5">
                    <table className="w-full border-separate border-spacing-0 border-none text-left">
                        <thead>
                            <tr>
                                <th>Item Id</th>
                                <th>Item Name</th>
                                <th>Description</th>
                                <th>Price</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map(function (item){
                                return(
                                    <tr >
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.description}</td>
                                        <td>{item.price}</td>
                                        <td>
                                            <button className="py-3 px-4 bg-fuchsia-800 text-white rounded-lg hover:bg-fuchsia-950 mb-2 text-sm" onClick={() =>editItem(item)}>Edit</button>
                                            <button className="py-3 px-4 bg-fuchsia-800 text-white rounded-lg hover:bg-fuchsia-950 mb-2 text-sm" onClick={() =>deleteItem(item.id)}>Delete</button>
                                        </td> 
                                    </tr>
                                )
                            })}
                            <tr>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="border border-slate-200 py-3 px-4 rounded-lg max-w-[700px] bg-fuchsia-300">
                    <form>
                        <div>
                            <label className="text-slate-600 font-sm block mb-2">Item Name</label>
                            <input type="text" className="text-slate-600 font-sm block mb-3 w-full p-2 border border-fuchsia-900 rounded-lg " value={itemName} onChange={handleItemName} required/>
                        </div>
                        <div>
                            <label className="text-slate-600 font-sm block mb-2">Description</label>
                            <input type="text" className="text-slate-600 font-sm block mb-3 w-full p-2 border border-fuchsia-900 rounded-lg "value={description} onChange={handleDescription} required/>
                        </div>
                        <div>
                            <label className="text-slate-600 font-sm block mb-2">Price</label>
                            <input type="text" className="text-slate-600 font-sm block mb-3 w-full p-2 border border-fuchsia-900 rounded-lg "value={price} onChange={handlePrice} required/>
                        </div>
                        <div>
                            <label className="text-slate-600 font-sm block mb-2">Category</label>
                            <select className="text-slate-600 font-sm block mb-3 w-full p-2 border border-slate-300 rounded-lg" value={itemCategoryId} onChange={handleCategoryId}required>
                            {itemCategories.map(function (itemCategory) {
                                return (
                                    <option value={itemCategory.id}>{itemCategory.name}</option>
                                )
                            })}
                            </select>
                        </div>
                        
                        {itemEditing?(
                            <>
                            <button type="button" className="py-3 px-4 bg-fuchsia-800 text-white rounded-lg hover:bg-fuchsia-950 mb-2 text-sm" onClick={updateItem}>Update Item</button>   
                            </>
                        ):(
                            <button type="button" className="py-3 px-4 bg-fuchsia-800 text-white rounded-lg hover:bg-fuchsia-950 mb-2 text-sm" onClick={handleSubmit}>Create Item</button>
                        )}

                    </form>
                </div>
                
            </div>
        </div>
    )
}

export default Item;