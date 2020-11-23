import { Status } from 'src/app/model/status';


//import { Employee } from "../business/model/employee";

export class Address {
    id: String;
    name: String;
    addressLigne1: String;
    addressLigne2: String;
    city: String;
    country: String;
    zipCode: String;
}
export class User {
    id: String;
    userName?: String;
    password?: String;
    email?: String;
    firstName?: String;
    lastName?: String;
    admin?: boolean;
    companyId?:String;
    isManager?:boolean = false;
    dateBirth?:string;
    status?:Status;
    address:Address;
    sailor?:boolean;
    image: string;
    lat;
    lon;
    description;
    name;
    userId;

    public static clone(src: User, dest : User):void {
        dest.id = src.id;
        dest.userName = src.userName;
        dest.admin = src.admin;
        dest.firstName = src.firstName;
        dest.lastName = src.lastName;
        dest.email = src.email;
        dest.companyId = src.companyId;
        dest.address = src.address;
        dest.sailor = src.sailor;
        dest.lat = src.lat;
        dest.lon = src.lon;
        dest.name = src.name;
        dest.description = src.description;
        dest.image = src.image;
 }

 

 
}
