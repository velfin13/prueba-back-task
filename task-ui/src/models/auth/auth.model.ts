export interface RegisterUserFormData {
    username: string;
    email: string;
    password: string;
}

export interface LoginUserFormData {
    email: string;
    password: string;
}

export interface User {
    id: number,
    username: string,
    email: string,
    createdAt: string,
}

export interface UpdateUserFormData {
    username: string,
    email: string,
    passwordActual: string,
    nuevaPassword: string
}

export interface LoginResponse {
    token: string | null;
}

export interface RegisterResponse {
    id: number,
    username: string,
    email: string
}


export interface AuthLocalStorage {
    token: string | null;
}