import {User} from "./user.model";

export class Product{
    id: string;
    name: string;
    description: string;
    images?: string[];
    price: number;
    sailor?: User;
    score?: number;
    stock?: number;
    numberClientReview?:number;
}
