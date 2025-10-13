import axios from "axios";
import BackendEndpoints from "../constants/backend-endpoints";
// import type { LoginModel } from "../models/login-model";
// import type { LoginResponse } from "../models/login-model";

import type { SigninModel } from "../models/signin-model";
import type { SigninResponse } from "../models/signin-model";

export const signinAdmin = async (reqBody: SigninModel): Promise<SigninResponse> => {
  const response = await axios.post<SigninResponse>( 
    BackendEndpoints.SIGNIN_ADMIN,
    reqBody,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};