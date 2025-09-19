// import axiosInstance from "./axios-service";
// import BackendEndpoints from "../constants/backend-endpoints";
// import type { LoginModel, LoginResponse } from "../models/login-model";

// export async function loginAdmin(body: LoginModel): Promise<LoginResponse> {
//   const response = await axiosInstance.post<LoginResponse>(BackendEndpoints.LOGIN_ADMIN, body);
//   return response.data;
// }

// import axios from "axios";
// import BackendEndpoints from "../constants/backend-endpoints";
// import type { LoginModel } from "../models/login-model";
// import type { LoginResponse } from "../models/login-response";

// export const loginAdmin = async (reqBody: LoginModel) => {
//   const response = await axios.post(
//     BackendEndpoints.LOGIN_ADMIN,  // e.g. "http://localhost:8080/api/auth/login"
//     reqBody,
//     {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     }
//   );
//   return response.data;
// };

import axios from "axios";
import BackendEndpoints from "../constants/backend-endpoints";
import type { LoginModel } from "../models/login-model";
import type { LoginResponse } from "../models/login-model";

export const loginAdmin = async (reqBody: LoginModel): Promise<LoginResponse> => {
  const response = await axios.post<LoginResponse>( // <LoginResponse> ensures type safety
    BackendEndpoints.LOGIN_ADMIN,
    reqBody,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data; // This will now be typed as LoginResponse
};


// import { DisplayErrorNotification } from '../utill/display-error-message.ts';
// import AxiosService from "./axios-service.ts";
// import BackendEndpoints from "../constants/backend-endpoints.ts";
// import {  LoginModel } from "../models/login-model.ts";
//
//
// export const loginAdmin = async (reqBody: LoginModel): Promise<LoginModel> => {
//     try {
//         const apiResponse = await AxiosService.post<LoginModel>(
//             BackendEndpoints.LOGIN_USER,
//             reqBody
//         )
//         return apiResponse.data;
//     } catch (apiError:any) {
//         const errorMessage =apiError.response.data.message
//         DisplayErrorNotification(errorMessage);
//         throw apiError;
//     }
// }