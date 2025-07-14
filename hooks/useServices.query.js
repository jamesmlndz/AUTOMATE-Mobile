import { useQuery } from "@tanstack/react-query";
import { getAllServices, getMyTodaysAppointments } from "../api/services";
import { useGetAppointmentById } from "./useAppointments.query";
import { getSingleAppointment } from "../api/appointments";

export const useGetAllServices = () => {
  return useQuery({
    queryKey: ["services"],
    queryFn: getAllServices,
  });
};

export const useGetTodayAppointment = (id) => {
  const today = new Date();
  const todayString = today.toISOString().split("T")[0]; // Format as YYYY-MM-DD

  return useQuery({
    queryKey: ["appointments", id ? id : todayString],
    queryFn: id ? () => getSingleAppointment(id) : getMyTodaysAppointments,
  });
};
