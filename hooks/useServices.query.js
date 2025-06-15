import { useQuery } from "@tanstack/react-query";
import { getAllServices } from "../api/services";

export const useGetAllServices = () => {
  return useQuery({
    queryKey: ["services"],
    queryFn: getAllServices,
  });
};
