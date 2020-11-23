
import { Product } from "./product";
import {Address, User} from 'src/app/model/user.model';

export class Order{
    id: number;
    orderStatus: string;
	expeditions: Expedition[];

	address:  Address;
}

export class Expedition {
    id: number;

	expeditionMode: string;
	expeditionStatus: string;

	startEstimatedDate: Date;
	endEstimatedDate: Date;
	receivedDate: Date;
	expeditionProducts: ExpeditionProduct[];

	sailor: Sailor;
	client:User
}

export class  ExpeditionProduct {

	id: number;

	quantity: number;
	price: number;

    product: Product;
}
export class  Sailor {
    id: number;
    userId: string;
	name: string;
	image;
	description: string;
	score: number;
	lat:number;
	lon:number;
}
