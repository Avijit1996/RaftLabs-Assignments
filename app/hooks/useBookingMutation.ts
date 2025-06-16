import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "../constants";

export const useAddBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (propertyId: string) => {
      const res = await axios.post(`${BASE_URL}/bookings`, {
        id: Date.now().toString(),
        propertyId,
        checkIn: "2024-02-01",
        checkOut: "2024-02-05",
        status: "confirmed",
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
  });
};
