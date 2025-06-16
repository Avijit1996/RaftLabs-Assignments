import { Feather } from "@expo/vector-icons";
import { TextInput, View } from "react-native";
import tw from "twrnc";

const SearchBar = ({ query, setQuery }: { query: string; setQuery: (text: string) => void }) => {
  return (
    <View style={tw`flex-row items-center bg-gray-100 rounded-full px-4 py-2 mb-4 shadow-sm`}>
      <Feather name="search" size={20} color="#999" style={tw`mr-2`} />
      <TextInput
        style={tw`flex-1 text-base text-gray-800`}
        placeholder="Search properties..."
        placeholderTextColor="#999"
        value={query}
        onChangeText={setQuery}
      />
    </View>
  );
};

export default SearchBar;