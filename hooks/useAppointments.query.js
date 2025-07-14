import { useQuery } from "@tanstack/react-query";
import { getAllAppointments, getSingleAppointment } from "../api/appointments";
import authenticatedApi, { getAxiosErrorMessage } from "../api/axiosInstance";

export const useGetAllAppointments = () =>
  useQuery({
    queryKey: ["appointments"],
    queryFn: getAllAppointments,
  });

export const useGetAppointmentById = (id) =>
  useQuery({
    queryKey: ["appointments", id],
    queryFn: () => getSingleAppointment(id),
  });

export const useGetVehicles = () => {
  const queryFn = async () => {
    try {
      const response = await authenticatedApi.get("/cars");
      return response.data;
    } catch (error) {
      throw new Error(getAxiosErrorMessage(error));
    }
  };

  return useQuery({
    queryKey: ["cars"],
    queryFn,
  });
};
