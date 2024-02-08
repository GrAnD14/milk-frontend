export interface Product {
    id: number,
    status: number,
    image: string,
    name: string,
    description: string,
    price: number
}

export interface User {
    id: number,
    name: string,
    email: string
}

export interface Order {
    id: number,
    status: number,
    owner: User,
    moderator: User,
    date_created: string,
    date_formation: string,
    date_complete: string
}

export interface Option {
    id: number,
    name: string
}