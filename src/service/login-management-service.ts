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

// export const loginCustomer = async (reqBody: LoginModel): Promise<LoginResponse> => {
//   const response = await axios.post<LoginResponse>( // <LoginResponse> ensures type safety
//     BackendEndpoints.LOGIN_CUSTOMER,
//     reqBody,
//     {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     }
//   );
//   return response.data;
// };