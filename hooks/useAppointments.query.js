import { useQuery } from "@tanstack/react-query";
import { getAllAppointments, getSingleAppointment } from "../api/appointments";
import authenticatedApi, { getAxiosErrorMessage } from "../api/axiosInstance";

export const useGetAllAppointments = (filter) =>
  useQuery({
    queryKey: ["appointments", filter],
    queryFn: () => getAllAppointments(filter),
  });

export const useGetAppointmentById = (id, filter) =>
  useQuery({
    queryKey: ["appointments", id, filter],
    queryFn: () => getSingleAppointment(id, filter),
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
