import Button from "@/components/UI/Button";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
    Dimensions,
    Image,
    Platform,
    ScrollView,
    Text,
    ToastAndroid,
    TouchableOpacity,
    View,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import { useAddBooking } from "../hooks/useBookingMutation";
import { useProperties } from "../hooks/useProperties";

const { width } = Dimensions.get("window");

export default function PropertyDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: properties } = useProperties();
  const { mutate: addBooking, isPending } = useAddBooking();
  const router = useRouter();

  const property = properties?.find((item) => item.id === id);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<ScrollView>(null);

  if (!property) return <Text>Property not found.</Text>;

  const handleBooking = () => {
    addBooking(property.id, {
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

  const handleScroll = (event: any) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setActiveIndex(index);
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <View style={tw`flex-row items-center px-4 py-3 border-b border-gray-200`}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} style={tw`mr-2`} />
        </TouchableOpacity>
        <Text style={tw`text-lg font-semibold flex-shrink`}>{property.title}</Text>
      </View>
      <ScrollView style={tw`flex-1`} showsVerticalScrollIndicator={false}>
        <ScrollView
          ref={scrollRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          style={tw`w-full h-60`}
        >
          {property.images.map((uri, index) => (
            <Image
              key={index}
              source={{ uri }}
              style={[tw`h-60`, { width }]}
              resizeMode="cover"
            />
          ))}
        </ScrollView>

        {/* Dots */}
        <View style={tw`flex-row justify-center mt-2`}>
          {property.images.map((_, index) => (
            <View
              key={index}
              style={[
                tw`w-2 h-2 mx-1 rounded-full`,
                {
                  backgroundColor: index === activeIndex ? "#4B5563" : "#D1D5DB",
                },
              ]}
            />
          ))}
        </View>
        <View style={tw`px-4 py-5`}>
          <Text style={tw`text-xl font-bold text-green-700 mb-1`}>
            ${property.price} / month
          </Text>
          <Text style={tw`text-base text-gray-700 mb-2`}>
            {property.location.address}, {property.location.city}, {property.location.state}
          </Text>

          <Text style={tw`text-lg font-semibold mt-4 mb-2`}>Features</Text>
          {property.features.map((feature, index) => (
            <Text key={index} style={tw`text-gray-600 mb-1`}>
              • {feature}
            </Text>
          ))}

          <Text style={tw`text-lg font-semibold mt-6 mb-2`}>Map Location</Text>
          <MapView
            style={tw`w-full h-40 rounded-lg`}
            initialRegion={{
              latitude: property.location.coordinates.latitude,
              longitude: property.location.coordinates.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          >
            <Marker
              coordinate={property.location.coordinates}
              title={property.title}
              description={property.location.city}
            />
          </MapView>
          <View style={tw`mt-6`}>
            <Button title="Book Now" onPress={handleBooking} disabled={isPending} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
