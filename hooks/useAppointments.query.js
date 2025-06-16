import { useQuery } from "@tanstack/react-query";
import { getAllAppointments } from "../api/appointments";

export const useGetAllAppointments = () =>
  useQuery({
    queryKey: ["appointments"],
    queryFn: getAllAppointments,
  });
