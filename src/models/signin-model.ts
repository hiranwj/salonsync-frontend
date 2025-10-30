export interface SigninModel {
    name: string;
    email: string;
    password: string;
    role: string;
    gender: string;
    contactNumber: string;
}

export interface SigninResponse {
    Message: string;
    Data: string;
}