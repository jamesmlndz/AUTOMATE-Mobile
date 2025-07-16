import authenticatedApi, { getAxiosErrorMessage } from "./axiosInstance";

export const getAllAppointments = async (filter) => {
  let queryParams = "";
  if (filter) {
    queryParams = Object.keys(filter)
      .map((key) => `${key}=${encodeURIComponent(filter[key])}`)
      .join("&");
  }
  console.log("🚀 ~ getAllAppointments ~ queryParams:", queryParams);
  try {
    const response = await authenticatedApi.get(
      `/appointments/my-appointments?${queryParams}`
    );
    return response.data;
  } catch (error) {
    throw new Error(getAxiosErrorMessage(error));
  }
};

export const getSingleAppointment = async (id, filter) => {
  console.log("🚀 ~ getSingleAppointment ~ id:", id);
  let queryParams = "";
  if (filter) {
    queryParams = Object.keys(filter)
      .map((key) => `${key}=${encodeURIComponent(filter[key])}`)
      .join("&");
  }
  console.log("🚀 ~ getSingleAppointment ~ queryParams:", queryParams);

  try {
    const response = await authenticatedApi.get(
      `/appointments/${id}?${queryParams}`
    );
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
