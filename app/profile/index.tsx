import Button from "@/components/UI/Button";
import {
    ActivityIndicator,
    Image,
    ScrollView,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import { PROFILE_TEXT } from "../constants";
import { useUserProfile } from "../hooks/useUserProfile";

export default function ProfileScreen() {
  const { data: user, isLoading, isError } = useUserProfile();

  const handleLogout = () => {
    // Your logout logic here
  };

  if (isLoading) {
    return (
      <View style={tw`flex-1 items-center justify-center`}>
        <ActivityIndicator size="large" color="#4B5563" />
      </View>
    );
  }

  if (isError || !user) {
    return (
      <View style={tw`flex-1 items-center justify-center`}>
        <Text style={tw`text-red-500`}>{PROFILE_TEXT.loadingError}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <ScrollView contentContainerStyle={tw`px-4 pt-6 pb-20`}>
        {/* Header */}
        <View style={tw`items-center`}>
          <Image
            source={{ uri: user.avatar || "https://i.pravatar.cc/150?img=12" }}
            style={tw`w-24 h-24 rounded-full mb-4`}
          />
          <Text style={tw`text-xl font-bold text-gray-800`}>{user.name}</Text>
          <Text style={tw`text-gray-600 mb-2`}>{user.email}</Text>
        </View>

        {/* Info Section */}
        <View style={tw`mt-6`}>
          <Text style={tw`text-lg font-semibold mb-2 text-gray-800`}>
            {PROFILE_TEXT.accountDetails}
          </Text>
          <View style={tw`bg-gray-100 rounded-lg p-4`}>
            <Text style={tw`text-gray-700 mb-1`}>
              {PROFILE_TEXT.email}: {user.email || "N/A"}
            </Text>
            <Text style={tw`text-gray-700 mb-1`}>
              {PROFILE_TEXT.totalBookings}: {user.bookings || "N/A"}
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Logout at bottom */}
      <View style={tw`absolute bottom-5 left-4 right-4`}>
        <Button
          title={PROFILE_TEXT.logout}
          onPress={handleLogout}
          variant="secondary"
        />
      </View>
    </SafeAreaView>
  );
}
