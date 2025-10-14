import { displayErrorMessage } from "../utill/display-error-message";
import AxiosService from "../service/axios-service.ts";
import BackendEndpoints from "../constants/backend-endpoints";
import type { GetStylistModel, StylistModel } from "../models/stylist-model.ts";

export const createNewStylist = async (reqBody: StylistModel): Promise<StylistModel> => {
    try {
        const apiResponse = await AxiosService.post<StylistModel>(
            BackendEndpoints.ADD_NEW_STYLIST,
            reqBody
        )
        return apiResponse.data;
    } catch (apiError:any) {
        const errorMessage =apiError.response.data.message
        displayErrorMessage(errorMessage);
        throw apiError;
    }
}

export const getAllStylists = async (): Promise<GetStylistModel> => {
    try {
        const apiResponse = await AxiosService.get<GetStylistModel>(
            BackendEndpoints.GET_ALL_STYLISTS,
        )
        return apiResponse.data;
    } catch (apiError) {
        throw apiError;
    }
}

export const updateStylist = async (id:number,requestBody:any): Promise<StylistModel> => {
    try {
        const apiResponse = await AxiosService.put<StylistModel>(
            BackendEndpoints.UPDATE_STYLIST+`?id=${id}`,
            requestBody
        )
        return apiResponse.data
    } catch (apiError: unknown) {
        throw apiError;
    }
}

export const findStylistByName = async (name:string): Promise<GetStylistModel> => {
    try {
        const apiResponse = await AxiosService.get<GetStylistModel>(
            BackendEndpoints.FIND_USER_BY_NAME+`?name=${name}`,
        )
        return apiResponse.data;
    } catch (apiError) {
        throw apiError;
    }
}

export const getAllStylistsByRating = async (): Promise<GetStylistModel> => {
    try {
        const apiResponse = await AxiosService.get<GetStylistModel>(
            BackendEndpoints.GET_ALL_USER_BY_RATE,
        )
        return apiResponse.data;
    } catch (apiError) {
        throw apiError;
    }
}

export const getAllStylistsByArea = async (serviceArea:string): Promise<GetStylistModel> => {
    try {
        const apiResponse = await AxiosService.get<GetStylistModel>(
            BackendEndpoints.FIND_STYLIST_BY_AREA+`?serviceArea=${serviceArea}`,
        )
        return apiResponse.data;
    } catch (apiError) {
        throw apiError;
    }
}

export const getAllLStylistsByType = async (serviceType:string): Promise<GetStylistModel> => {
    try {
        const apiResponse = await AxiosService.get<GetStylistModel>(
            BackendEndpoints.FIND_STYLIST_BY_TYPE+`?serviceType=${serviceType}`,
        )
        return apiResponse.data;
    } catch (apiError) {
        throw apiError;
    }
}