export class AccountCreationModel {
    name:string;
    saloon_name:string
    email:string;
    contact_number:string;
    image:string;
    password:string;
    confirmPassword:string
    city:string;
    term:boolean;

}

export class VerifiactionModel {
    otp:any;

}

export class SaloonDetailsModel {
    category:string;
    services:string;
    image:string;
    saloonId:number

}