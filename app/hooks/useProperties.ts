import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "../constants";

export type Property = {
  id: string;
  title: string;
  price: number;
  location: {
    address: string;
    city: string;
    state: string;
    coordinates: {
      latitude: number;
      longitude: number;
    };
  };
  features: string[];
  images: string[];
};

export const useProperties = () => {
  return useQuery({
    queryKey: ["properties"],
    queryFn: async () => {
      const res = await axios.get<Property[]>(`${BASE_URL}/properties`);
      return res.data;
    },
  });
};
