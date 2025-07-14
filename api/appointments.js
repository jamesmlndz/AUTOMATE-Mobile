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
  console.log("🚀 ~ getSingleAppointment ~ id:", id);
  try {
    const response = await authenticatedApi.get("/appointments/" + id);
    console.log(
      "🚀 ~ getSingleAppointment ~ response:",
      response.data.data.appointment
    );
    return { data: response.data.data.appointment };
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
