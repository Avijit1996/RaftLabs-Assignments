// components/ui/Button.tsx
import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";
import tw from "twrnc";

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: "primary" | "secondary";
}

export default function Button({ title, variant = "primary", style, ...rest }: ButtonProps) {
  const baseStyle = tw`rounded-xl py-3 px-6`;
  const variantStyle =
    variant === "primary"
      ? tw`bg-green-600`
      : tw`bg-red-600`;

  return (
    <TouchableOpacity
      style={[baseStyle, variantStyle, style]}
      activeOpacity={0.8}
      {...rest}
    >
      <Text style={tw`text-white text-center text-base font-semibold`}>{title}</Text>
    </TouchableOpacity>
  );
}
