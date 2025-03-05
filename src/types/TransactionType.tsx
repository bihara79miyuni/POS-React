import UserType from "./UserType";

interface TransactionType{
    id:number,
    createdAt:string,
    totalAmount:string,
    user?:UserType
}
export default TransactionType;