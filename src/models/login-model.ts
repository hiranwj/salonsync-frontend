export interface LoginModel {
  email: string;
  password: string;
}

export interface LoginResponse {
    Data: {
        id: number;
        email: string;
        name: string;
        contactNumber: string;
        token: string;
        role: string;
    };
}