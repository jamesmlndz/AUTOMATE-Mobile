import { useQuery } from "@tanstack/react-query";
import { getAllServices, getMyTodaysAppointments } from "../api/services";

export const useGetAllServices = () => {
  return useQuery({
    queryKey: ["services"],
    queryFn: getAllServices,
  });
};

export const useGetTodayAppointment = () => {
  const today = new Date();
  const todayString = today.toISOString().split("T")[0]; // Format as YYYY-MM-DD

  return useQuery({
    queryKey: ["appointments", todayString],
    queryFn: getMyTodaysAppointments,
  });
};
