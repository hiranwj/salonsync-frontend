// export interface StylistModel {
//     id?:string,
//     firstName:string,
//     lastName:string,
//     address:string,
//     mobile:string,
//     available:boolean,
//     type:string,
//     serviceArea:string,
//     serviceType:string,
//     qualification:string,
//     links:string
// }

// export interface GetStylistModel extends StylistModel{
//     response:[]
// }

export interface StylistModel {
    name: string;
    email: string;
    contactNumber: string;
    gender: string;
    specialization: string[]; // multiple values (checkbox selection)
}

export interface StylistResponse {
    Message: string;
    Data: string;
}