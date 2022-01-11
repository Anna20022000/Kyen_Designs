import { Role } from "./role";

export class User {
    id ?: number;
    name ?: string;
    userName ?: string;
    passWord ?: string;
    email ?: string;
    address ?: string;
    phone ?: string;
    image ?: string;
    dateOfBirth ?: Date;
    roleUser_Id ?: number;
    
    role ?: Role;
    token?: string;

}