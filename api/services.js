import authenticatedApi, { getAxiosErrorMessage } from "./axiosInstance";

export const getAllServices = async () => {
  try {
    const response = await authenticatedApi.get("/services");
    console.log(Object.keys(response.data));
    console.log("Response data:", response.data);
    return response.data;
  } catch (error) {
    throw new Error(getAxiosErrorMessage(error));
  }
};
