import { useMutation, useQueryClient } from "@tanstack/react-query";
import authenticatedApi, { getAxiosErrorMessage } from "../api/axiosInstance";

export const useAppointmentsMutation = () => {
  const queryClient = useQueryClient();
  const today = new Date();
  const todayString = today.toISOString().split("T")[0]; // Format as YYYY-MM-DD

  const updateAppointment = useMutation({
    mutationFn: async (payload) => {
      console.log(payload);
      try {
        const response = await authenticatedApi.patch(
          `/appointments/${payload.id}`,
          { status: payload.status },
          { withCredentials: true }
        );
        return response.data;
      } catch (error) {
        throw new Error(getAxiosErrorMessage(error));
      }
    },
    onSuccess: (data, payload) => {
      console.log("Appointment updated successfully:", data);
      queryClient.invalidateQueries({
        queryKey: ["appointments", todayString],
      });
    },
    onError: (error) => {
      console.error("Error updating appointment:", error.message);
      alert(error.message); // Display the error message to the user
    },
  });

  return { updateAppointment };
};
