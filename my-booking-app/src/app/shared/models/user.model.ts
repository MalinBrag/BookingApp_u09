export interface User {
    id?: string;
    name?: string;
    email?: string;
    phone?: string;
    password?: string;
    password_confirmation?: string;
    role?: string;
    _id?: string;
}

export interface RegisterUser {
    name: string;
    email: string;
    phone: string;
    password: string;
    password_confirmation: string;
    role?: string;
}

export interface LoginUser {
    email: string;
    password: string;
}

export interface LoginResponse {
    token: string;
    userId: string;
    role: string;
}

export interface EditUser {
    userId: string;
    user: User;
}

export interface RequiredUserData {
    name: string;
    email: string;
    phone: string;
}

