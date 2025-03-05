import ItemType from "./ItemType";

interface StockType{
    id:number,
    updatedAt:string,
    quantity:number,
    item?:ItemType
}

export default StockType;