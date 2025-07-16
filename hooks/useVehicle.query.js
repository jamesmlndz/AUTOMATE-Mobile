import { useQuery } from "@tanstack/react-query";
import { getAllServices, getMyTodaysAppointments } from "../api/services";
import { useGetAppointmentById } from "./useAppointments.query";
import { getSingleAppointment } from "../api/appointments";
import { getUserVehicles } from "../api/vehicles";

export const useGetUserVehicles = () => {
  return useQuery({
    queryKey: ["vehicles"],
    queryFn: getUserVehicles,
  });
};
