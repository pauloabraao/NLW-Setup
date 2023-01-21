import { TouchableOpacity, View, Text } from "react-native";

import { Feather } from "@expo/vector-icons";

import colors from "tailwindcss/colors";
import { useNavigation } from "@react-navigation/native";

import Logo from "../assets/logo.svg";

export function Header() {
  const { navigate } = useNavigation();
  return (
    <View className="w-full flex-row items-center justify-between">
      <Logo />
      <TouchableOpacity
        activeOpacity={0.7}
        className="flex-col items-center px-2 justify-center gap-1"
        onPress={() => navigate("new")}
      >
        <Feather name="plus-circle" color={colors.violet[500]} size={25} />
        <Text className="text-white font-semibold text-base">New</Text>
      </TouchableOpacity>
    </View>
  );
}
