import { useEffect,useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ItemType from "../types/ItemType";
import axios from "axios";
import TransactionType from "../types/TransactionType";
import { useAuth } from "../context/AuthContext";


function Transaction(){
     const { isAuthenticated, jwtToken } = useAuth();
            
            
        const config = {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        }
    const [items,setItems] = useState<ItemType[]>([]);

    const[transactions,setTransactions] = useState<TransactionType[]>([]);

    
    async function loadItems() {
        const response = await axios.get("http://localhost:8080/items",config);
        setItems(response.data);
    }

    async function loadTransactions(){
        const response =await axios.get("http://localhost:8080/transactions",config);
        setTransactions(response.data);
    }

    const[itemTransactions,setItemTransactions] = useState<ItemType[]>([]);
    const[total,setTotal] = useState<number>(0);

    function addItemsToTransactions(item:ItemType){
        const updatedTransaction = [...itemTransactions,item];
        setItemTransactions(updatedTransaction);
    }

    useEffect(function () {
        items.map(function (item) {
            const totalAmount = total + item.price;
            setTotal(totalAmount);
        })
    }, [itemTransactions]);

    const navigate = useNavigate();


    useEffect(function(){
        if(isAuthenticated){
            loadItems();
            loadTransactions();
        }        
    },[isAuthenticated])

    async function saveTransaction(){
        var itemIds:any = [];
        
        itemTransactions.map(function(item){
            itemIds.push(item.id);
        });

        try{
            await axios.post("http://localhost:8080/transactions",{itemIds:itemIds})
            navigate("/transactions");
        }catch(error){
            console.log(error);
        }
    }


    

    return(
        <div className="container mx-auto pt-5 pb-5 font-bold">
            <div >
                <div className="bg-fuchsia-200">
                    <h1 className="text-3xl text-center text-blue-900">Sales  System</h1>
                </div>
                <div className="bg-fuchsia-300">
                    <Link to="/" className="relative bg-white-800 p-1 text-gray-400 hover:text-black focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden px-10 py-10">Home</Link>
                    <Link to="/items" className="relative bg-white-800 p-1 text-gray-400 hover:text-black focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden px-10 py-10">Sale Items</Link>
                    <Link to="/itemCategories" className="relative bg-white-800 p-1 text-gray-400 hover:text-black focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden px-10">ItemCategories</Link>
                    <Link to="/stocks" className="relative bg-white-800 p-1 text-gray-400 hover:text-black focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden px-10">Stocks</Link>
                    <Link to="/transactions" className="relative bg-white-800 p-1 text-blue-900 hover:text-black focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden px-10">Transactions</Link>
                </div>
                <div className="bg-fuchsia-200">

                </div>
                
            </div>
            <h3 className="text-blue-1000 bg-fuchsia-500">Sale Items</h3>
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
                                        <td >{item.price}</td>
                                        <td>
                                            <button className="py-3 px-4 bg-fuchsia-800 text-white rounded-lg hover:bg-fuchsia-950 mb-2 text-sm" onClick={() =>addItemsToTransactions(item)}>Add</button>
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
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>ItemName</th>
                                <th>Description</th>
                                <th>price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {itemTransactions.map(function(item){
                                return(
                                    <tr>
                                        <td>{item.name}</td>
                                        <td>{item.description}</td>
                                        <td>{item.price}</td>
                                    </tr>
                                )
                            })}
                            <tr>
                                <td colSpan={2}>
                                    <strong>Total Amount</strong>
                                </td>
                                <td  className="border-t border-slate-500 text-right">
                                    <strong>{total}</strong>
                                </td>
                            </tr>
                            
                        </tbody>
                    </table>
                    <button className="py-3 px-4 bg-fuchsia-800 text-white rounded-lg hover:bg-fuchsia-950 mb-2 text-sm" onClick={saveTransaction}>Create Transaction</button>
                </div>
                <h3 className="text-blue-1000 bg-fuchsia-500">Transactions</h3>
                <div>
                <table className="w-full border-separate border-spacing-0 border-none text-left">
                <thead >
                    <tr>
                        <th className="w-[80px]">Transaction ID</th>
                        <th className="w-[200px]">Created At</th>
                        <th className="w-[200px]">Total Amount</th>
                             
                    </tr>
                </thead>
                <tbody>
                    {transactions.map(function (Transaction) {
                        return (
                            <tr>
                                <td>{Transaction.id}</td>
                                <td>{Transaction.createdAt}</td>
                                <td className="text-right">{Transaction.totalAmount}</td>
                               
                                
                                
                            </tr>
                        )
                    })}
                </tbody>
            </table>
                </div>
               
        </div>
    )
}

export default Transaction;