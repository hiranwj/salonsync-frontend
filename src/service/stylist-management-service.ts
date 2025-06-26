import { DisplayErrorNotification } from "../utill/display-error-message";
import AxiosService from "../service/axios-service.ts";
import BackendEndpoints from "../constants/backend-endpoints";
import type { GetLaborerModel, LaborerModel } from "../models/stylist-model.ts";

export const createNewStylist = async (reqBody: LaborerModel): Promise<LaborerModel> => {
    try {
        const apiResponse = await AxiosService.post<LaborerModel>(
            BackendEndpoints.ADD_NEW_STYLIST,
            reqBody
        )
        return apiResponse.data;
    } catch (apiError:any) {
        const errorMessage =apiError.response.data.message
        DisplayErrorNotification(errorMessage);
        throw apiError;
    }
}

export const getAllStylists = async (): Promise<GetLaborerModel> => {
    try {
        const apiResponse = await AxiosService.get<GetLaborerModel>(
            BackendEndpoints.GET_ALL_ACTIVE_LABORERS,
        )
        return apiResponse.data;
    } catch (apiError) {
        throw apiError;
    }
}

export const deleteLaborer = async (id:number): Promise<LaborerModel> => {
    try {
        const apiResponse = await AxiosService.delete<LaborerModel>(
            BackendEndpoints.DELETE_LABORER+`?id=${id}`,
        )
        return apiResponse.data
    } catch (apiError: unknown) {
        throw apiError;
    }
}

export const updateLaborer = async (id:number,requestBody:any): Promise<LaborerModel> => {
    try {
        const apiResponse = await AxiosService.put<LaborerModel>(
            BackendEndpoints.UPDATE_LABORER+`?id=${id}`,
            requestBody
        )
        return apiResponse.data
    } catch (apiError: unknown) {
        throw apiError;
    }
}

export const findLaboreByName = async (name:string): Promise<GetLaborerModel> => {
    try {
        const apiResponse = await AxiosService.get<GetLaborerModel>(
            BackendEndpoints.FIND_USER_BY_NAME+`?name=${name}`,
        )
        return apiResponse.data;
    } catch (apiError) {
        throw apiError;
    }
}

export const getAllLaborersByRating = async (): Promise<GetLaborerModel> => {
    try {
        const apiResponse = await AxiosService.get<GetLaborerModel>(
            BackendEndpoints.GET_ALL_USER_BY_RATE,
        )
        return apiResponse.data;
    } catch (apiError) {
        throw apiError;
    }
}

export const getAllLaborersByArea = async (serviceArea:string): Promise<GetLaborerModel> => {
    try {
        const apiResponse = await AxiosService.get<GetLaborerModel>(
            BackendEndpoints.FIND_LABOR_BY_AREA+`?serviceArea=${serviceArea}`,
        )
        return apiResponse.data;
    } catch (apiError) {
        throw apiError;
    }
}

export const getAllLaborersByType = async (serviceType:string): Promise<GetLaborerModel> => {
    try {
        const apiResponse = await AxiosService.get<GetLaborerModel>(
            BackendEndpoints.FIND_LABOR_BY_TYPE+`?serviceType=${serviceType}`,
        )
        return apiResponse.data;
    } catch (apiError) {
        throw apiError;
    }
}