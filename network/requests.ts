import { axiosInstance } from "./api";

let globalHeaders = {
  "content-type": "application/json",
};


export const getRequest = async (endPoint: string) => {
  try {
    const result = await axiosInstance.get(endPoint);

    return { result, isSuccess: true };
  } catch (error) {
    return { result: error, isSuccess: false };
  }
};




export const postRequest = async (endPoint: string, payload: any, headers: any = globalHeaders) => {
  try {
    const result = await axiosInstance.post(endPoint, payload, { headers });

    return { result, isSuccess: true };
  } catch (error) {
    const extractError = (error: any) => {
      return error?.response && error?.response?.data?.message
        ? error?.response?.data?.message
        : error?.response?.data?.error
        ? error?.response?.data?.error
        : error?.response?.data
        ? error?.response?.data
        : error?.message;
    };

    return { result: extractError(error), isSuccess: false };
  }
};


export const postRequestWithFiles = async (endPoint: string, payload: any) => {
  try {
    const result: any = await axiosInstance.post(endPoint, payload);

    return { result, isSuccess: true };
  } catch (error) {
    return { result: error, isSuccess: false };
  }
};

export const deleteRequest = async (endPoint: string, payload: any) => {
  try {
    const result = await axiosInstance.delete(endPoint, payload);

    return { result, isSuccess: true };
  } catch (error) {
    return { result: error, isSuccess: false };
  }
};

export const putRequest = async (endPoint: string, payload: any) => {
  try {
    const result = await axiosInstance.put(endPoint, payload);

    return { result, isSuccess: true };
  } catch (error) {
    return { result: error, isSuccess: false };
  }
};

export const patchRequest = async (endPoint: string, payload: any) => {
  try {
    const result = await axiosInstance.patch(endPoint, payload);

    return { result, isSuccess: true };
  } catch (error) {
    return { result: error, isSuccess: false };
  }
};
