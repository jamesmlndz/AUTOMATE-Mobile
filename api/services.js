import authenticatedApi, { getAxiosErrorMessage } from "./axiosInstance";

export const getAllServices = async (filter) => {
  let queryParams = "";
  if (filter) {
    queryParams = Object.keys(filter)
      .map((key) => `${key}=${encodeURIComponent(filter[key])}`)
      .join("&");
  }
  console.log("🚀 ~ getAllServices ~ queryParams:", queryParams);
  try {
    const response = await authenticatedApi.get(`/services?${queryParams}`);
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
