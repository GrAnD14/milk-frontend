export interface Product {
    id: number,
    name: string,
    description: string,
    price: string,
    status: number,
    image: string
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
    date_complete: string,
    delivery_date: string
}

export interface Option {
    id: number,
    name: string
}