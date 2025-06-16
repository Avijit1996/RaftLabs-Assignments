import { Platform } from "react-native";

export const BASE_URL =
  Platform.OS === "android" ? "http://10.0.2.2:3000" : "http://localhost:3000";

  export const BOOKING_TEXT = {
    header: "Your Bookings",
    empty: "No bookings yet.",
    statusPrefix: "Status:",
    locationSeparator: ", ",
  };

  export const PROFILE_TEXT = {
    loadingError: "Failed to load profile.",
    accountDetails: "Account Details",
    email: "Email",
    totalBookings: "Total Bookings",
    logout: "Logout",
  };
