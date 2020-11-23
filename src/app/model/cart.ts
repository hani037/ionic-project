import { CartProduct } from "./cartProduct";

export class Cart{
    id: number;
    cartProducts: CartProduct[];
    addressId?: string;
}