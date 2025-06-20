import { useQuery } from "@tanstack/react-query";
import { getAllAppointments } from "../api/appointments";

export const useGetAllAppointments = () =>
  useQuery({
    queryKey: ["appointments"],
    queryFn: getAllAppointments,
  });

export const useGetAppointmentById = (id) =>
  useQuery({
    queryKey: ["appointments", id],
    queryFn: () => getAllAppointments(id),
  });
