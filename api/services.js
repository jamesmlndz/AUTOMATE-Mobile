import authenticatedApi, { getAxiosErrorMessage } from "./axiosInstance";

export const getAllServices = async () => {
  try {
    const response = await authenticatedApi.get("/services");
    return response.data;
  } catch (error) {
    throw new Error(getAxiosErrorMessage(error));
  }
};

export const getMyTodaysAppointments = async () => {
  try {
    const response = await authenticatedApi.get(
      "/appointments/my-appointments/active"
    );
    return response.data;
  } catch (error) {
    throw new Error(getAxiosErrorMessage(error));
  }
};
