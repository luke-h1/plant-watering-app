import { Platform, Pressable, StyleSheet, Text } from "react-native";
import * as Haptics from "expo-haptics";
import theme from "@/styles/theme";

interface Props {
  title: string;
  onPress: () => void;
}

export default function PlantlyButton({ onPress, title }: Props) {
  const handlePress = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    onPress();
  };

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => {
        if (pressed) {
          return [styles.button, styles.buttonPressed];
        }
        return styles.button;
      }}
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  text: {
    color: theme.color.white,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  button: {
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 6,
    backgroundColor: theme.color.green,
  },
  buttonPressed: {
    backgroundColor: theme.color.leafyGreen,
  },
});
