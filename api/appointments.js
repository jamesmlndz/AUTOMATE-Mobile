import authenticatedApi, { getAxiosErrorMessage } from "./axiosInstance";

export const getAllAppointments = async () => {
  try {
    const response = await authenticatedApi.get("/appointments");
    return response.data;
  } catch (error) {
    throw new Error(getAxiosErrorMessage(error));
  }
};
