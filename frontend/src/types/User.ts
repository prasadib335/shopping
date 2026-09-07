
export type UserRole = "USER" | "ADMIN";

export interface User {
        userId : number;
        name : string;
        email : string;
        role : UserRole;
        createdAt : string;
        active : boolean;
}

export interface RegisterUser {
        name : string;
        email : string;
        password : string;
}

export interface LoginRequest {
        email : string;
        password : string;
}

export interface UpdateUser {
       name : string;
       email : string;
       password : string;
}