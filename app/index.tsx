import Button from "@/components/UI/Button";
import { useRouter } from "expo-router";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Platform,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import SearchBar from "../components/UI/SearchBar";
import { useAddBooking } from "../hooks/useBookingMutation";
import { useProperties } from "../hooks/useProperties";
import { useSearchStore } from "../store/useSearchStore";

export default function HomeScreen() {
  const { query, setQuery } = useSearchStore();
  const { data, isLoading } = useProperties();
  const router = useRouter();
  const { mutate: addBooking } = useAddBooking();

  const filteredData = data?.filter((property) =>
    property.title.toLowerCase().includes(query.toLowerCase())
  );

  const handleBooking = (id: string): void => {
    addBooking(id, {
      onSuccess: () => {
        router.push("/bookings");
        if (Platform.OS === "android") {
          ToastAndroid.show("Booking Confirmed!", ToastAndroid.SHORT);
        }
      },
      onError: (error) => {
        console.error("Booking failed:", error);
      },
    });
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <View style={tw`p-4 mb-10`}>
        <SearchBar query={query} setQuery={setQuery} />
        {isLoading ? (
          <ActivityIndicator size="large" style={tw`mt-10`} />
        ) : (
          <FlatList
            data={filteredData}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <View style={tw`mb-5 p-4 rounded-xl border border-gray-200 bg-white shadow-md`}>
                <TouchableOpacity
                  onPress={() => router.push(`/property/${item.id}`)}
                  activeOpacity={0.8}
                >
                  <Image
                    source={{ uri: item.images[0] }}
                    style={tw`w-full h-48 rounded-lg mb-2`}
                    resizeMode="cover"
                  />
                  <Text style={tw`text-lg font-bold mb-1`}>{item.title}</Text>
                  <Text style={tw`text-gray-600 mb-1`}>
                    {item.location.city}, {item.location.state}
                  </Text>
                  <Text style={tw`text-green-700 font-semibold`}>
                    ${item.price}/ month
                  </Text>
                </TouchableOpacity>
                <Button
                  title="Book Now"
                  onPress={() => handleBooking(item.id)}
                  variant="primary"
                  style={tw`mt-3`}
                />
              </View>
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
}
