import authenticatedApi, { getAxiosErrorMessage } from "./axiosInstance";

export const getAllAppointments = async () => {
  try {
    const response = await authenticatedApi.get(
      "/appointments/my-appointments"
    );
    return response.data;
  } catch (error) {
    throw new Error(getAxiosErrorMessage(error));
  }
};

export const getSingleAppointment = async (id) => {
  try {
    const response = await authenticatedApi.get("/appointments/" + id);
    return response.data;
  } catch (error) {
    throw new Error(getAxiosErrorMessage(error));
  }
};

export const submitFeedback = async (bookingId, comment, rating) => {
  try {
    const response = await authenticatedApi.post(
      `/appointments/${bookingId}/feedback`,
      { comment, rating }
    );
    return response.data;
  } catch (error) {
    throw new Error(getAxiosErrorMessage(error));
  }
};
