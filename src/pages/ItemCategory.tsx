import { Link } from "react-router-dom";

function ItemCategory(){
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
                </div>
                <div className="bg-fuchsia-200">

                </div>
                
            </div>
        </div>
    )
}

export default ItemCategory;