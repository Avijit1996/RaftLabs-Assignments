import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { BASE_URL } from '../constants';


export const useBookings = () => {
  return useQuery({
    queryKey: ['bookings'],
    queryFn: async () => {
      const res = await axios.get(`${BASE_URL}/bookings`);
      return res.data;
    },
  });
};
