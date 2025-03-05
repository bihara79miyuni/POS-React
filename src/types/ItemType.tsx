import ItemCategoryType from "./ItemCategoryType";

interface ItemType{
    id:number,
    description:string,
    price:number,
    itemCategory?:ItemCategoryType
}

export default ItemType;