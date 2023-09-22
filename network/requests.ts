import { axiosInstance } from "./api";

export const getRequest = async (endPoint: string) => {
  try {
    const result = await axiosInstance.get(endPoint);

    return { result, isSuccess: true };
  } catch (error) {
    return { result: error, isSuccess: false };
  }
};

export const postRequest = async (endPoint: string, payload: any) => {
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
