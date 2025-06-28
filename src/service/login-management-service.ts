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