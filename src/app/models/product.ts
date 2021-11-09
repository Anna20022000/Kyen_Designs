import { Category } from "./category";

export class Product {
    id ?: number;
    name ?: string;
    color ?: string;
    size ?: string;
    state ?: boolean;
    description ?: string;
    avatarImage ?: string;
    price ?: number;
    quantity ?: number;
    productCategory_Id ?: number;
    soLuongBan ?: number;
    tongThu ?: number;
    category?: Category;
}
