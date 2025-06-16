import {
    ActivityIndicator,
    FlatList,
    Image,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import { BOOKING_TEXT } from "../constants";
import { useBookings } from "../hooks/useBookings";
import { useProperties } from "../hooks/useProperties";

export default function BookingsScreen() {
    const { data: bookings, isLoading } = useBookings();
    
    const { data: properties } = useProperties();

    const getPropertyById = (id: string) =>
        properties?.find((p) => p.id === id);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    if (isLoading) {
        return (
            <SafeAreaView style={tw`flex-1 justify-center items-center bg-white`}>
                <ActivityIndicator size="large" color="#4B5563" />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={tw`flex-1 bg-white`}>
            <View style={tw`p-4`}>
                <Text style={tw`text-2xl font-bold text-gray-800 mb-4`}>
                    {BOOKING_TEXT.header}
                </Text>

                {!bookings || bookings.length === 0 ? (
                    <Text style={tw`text-gray-500 text-base`}>{BOOKING_TEXT.empty}</Text>
                ) : (
                    <FlatList
                        data={bookings}
                        keyExtractor={(item) => item.id}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={tw`pb-6`}
                        renderItem={({ item }) => {
                            const property = getPropertyById(item.propertyId);
                            if (!property) return null;

                            return (
                                <View style={tw`mb-5 bg-white rounded-xl shadow-md overflow-hidden`}>
                                    <Image
                                        source={{ uri: property.images[0] }}
                                        style={tw`w-full h-48`}
                                        resizeMode="cover"
                                    />
                                    <View style={tw`p-4`}>
                                        <Text style={tw`text-lg font-semibold text-gray-800`}>
                                            {property.title}
                                        </Text>
                                        <Text style={tw`text-sm text-gray-600 mt-0`}>
                                            {property.location.city}
                                            {BOOKING_TEXT.locationSeparator}
                                            {property.location.state}
                                        </Text>
                                        <Text style={tw`text-sm text-green-700 mt-1`}>
                                            {BOOKING_TEXT.statusPrefix} {item.status}
                                        </Text>
                                        <View style={tw`flex-row justify-between flex-wrap mt-1`}>
                                            <Text style={tw`text-sm text-gray-700 mr-2`}>
                                                Check-in: {formatDate(item.checkIn)}
                                            </Text>
                                            <Text style={tw`text-sm text-gray-700`}>
                                                Check-out: {formatDate(item.checkOut)}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            );
                        }}
                    />
                )}
            </View>
        </SafeAreaView>
    );
}
