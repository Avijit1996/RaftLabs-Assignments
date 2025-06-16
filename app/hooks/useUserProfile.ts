import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "../constants";

export const useUserProfile = () => {
  return useQuery({
    queryKey: ["userProfile"],
    queryFn: async () => {
      const response = await axios.get(`${BASE_URL}/profile`);
      return response.data;
    },
  });
};
