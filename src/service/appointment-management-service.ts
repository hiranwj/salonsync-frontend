import axios from "axios";
import BackendEndpoints from "../constants/backend-endpoints";

import type { AppointmentModel } from "../models/appointment-model";
import type { AppointmnetResponse } from "../models/appointment-model";

export const appointment = async (reqBody: AppointmentModel): Promise<AppointmnetResponse> => {
  const response = await axios.post<AppointmnetResponse>( 
    BackendEndpoints.ADD_NEW_APPOINTMENT,
    reqBody,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};