import {
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import colors from "tailwindcss/colors";
import { BackButton } from "../components/BackButton";
import { CheckBox } from "../components/CheckBox";
import { useState } from "react";
import { api } from "../lib/axios";

const avaiableWeekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export function New() {
  const [title, setTitle] = useState("");
  const [weekDays, setWeekDays] = useState<number[]>([]);

  function handleToggleWeekDay(weekDayIndex: number) {
    if (weekDays.includes(weekDayIndex)) {
      setWeekDays((prevState) =>
        prevState.filter((weekDay) => weekDay !== weekDayIndex)
      );
    } else {
      setWeekDays((prevState) => [...prevState, weekDayIndex]);
    }
  }

  async function handleCreateNewHabit() {
    try {
      if (!title.trim()) {
        return Alert.alert("New Habit", "Please enter the habit name");
      }
      if (weekDays.length === 0) {
        return Alert.alert("New Habit", "Please choose the recurrence");
      }

      await api.post("/habits", { title, weekDays });
      setTitle("");
      setWeekDays([]);

      Alert.alert("New Habit", "New habit created");
    } catch (error) {
      Alert.alert("Ops! ", "Sorry, something went wrong");
    }
  }

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 200 }}
      >
        <BackButton />

        <Text className="mb-5 ml-10 -mt-8 text-white font-extrabold text-3xl text-right">
          Create Habit
        </Text>
        <Text className="mt-10 text-white font-semibold text-base">
          What's your compromise?
        </Text>

        <TextInput
          className="h-12 pl-4 rounded-lg mt-5 bg-zinc-900 text-white border-2 border-zinc-800 focus:border-green-600 "
          placeholder="Exercize, study, read a book..."
          placeholderTextColor={colors.zinc[400]}
          onChangeText={setTitle}
          value={title}
        />

        <Text className="font-semibold mt-5 mb-5 text-white text-base">
          What's the recurrence?
        </Text>
        {avaiableWeekDays.map((weekDay, index) => (
          <CheckBox
            key={weekDay}
            title={weekDay}
            onPress={() => handleToggleWeekDay(index)}
            checked={weekDays.includes(index)}
          />
        ))}

        <TouchableOpacity
          className="w-full h-14 flex-row items-center justify-center bg-green-600 rounded-md mt-5"
          activeOpacity={0.7}
          onPress={handleCreateNewHabit}
        >
          <Feather name="check" size={20} color={colors.white} />
          <Text className="font-sembiold text-base text-white ml-2">
            Confirmar
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
