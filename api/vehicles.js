import authenticatedApi, { getAxiosErrorMessage } from "./axiosInstance";

export const getUserVehicles = async () => {
  try {
    const response = await authenticatedApi.get("/my-vehicles");
    return response.data;
  } catch (error) {
    throw new Error(getAxiosErrorMessage(error));
  }
};
