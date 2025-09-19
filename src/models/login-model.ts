// export interface LoginModel {
//     email?:string,
//     password:string,
//
// }

export interface LoginModel {
  email: string;
  password: string;
}

// export interface LoginResponse {
//   token?: string;          // backend might return this
//   accessToken?: string;    // or this
//   message?: string;        // error/success message
//   [key: string]: any;      // allow extra fields
// }

export interface LoginResponse {
    Data: {
        id: number;
        email: string;
        contactNumber: string;
        token: string;
    };
}