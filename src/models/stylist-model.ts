export interface LaborerModel {
    id?:string,
    firstName:string,
    lastName:string,
    address:string,
    mobile:string,
    available:boolean,
    type:string,
    serviceArea:string,
    serviceType:string,
    qualification:string,
    links:string
}

export interface GetLaborerModel extends LaborerModel{
    response:[]
}