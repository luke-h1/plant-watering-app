import useUserStore from "@/store/userStore";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import theme from "@/styles/theme";
import { Platform, StatusBar, StyleSheet, Text, View } from "react-native";
import PlantlyImage from "@/components/PlantlyImage";
import PlantlyButton from "@/components/PlantlyButton";

export default function OnboardingScreen() {
  const router = useRouter();
  const toggleHasOnboarded = useUserStore((state) => state.toggleHasOnboarded);

  const handlePress = () => {
    toggleHasOnboarded();
    router.replace("/");
  };

  return (
    <LinearGradient
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      colors={[
        theme.color.green,
        theme.color.appleGreen,
        theme.color.limeGreen,
      ]}
    >
      <StatusBar barStyle="light-content" />
      <View>
        <Text style={styles.heading}>Plantly</Text>
        <Text style={styles.tagLine}>
          Keep your plants healthy and hydrated
        </Text>
      </View>
      <PlantlyImage />
      <PlantlyButton title="Let me in!" onPress={handlePress} />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: theme.color.white,
    paddingHorizontal: 0,
  },
  heading: {
    fontSize: 42,
    color: theme.color.white,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
  },
  tagLine: {
    fontSize: 34,
    color: theme.color.white,
    textAlign: "center",
    fontFamily: Platform.select({
      ios: "Caveat-Regular",
      android: "Caveat_400Regular",
    }),
  },
});
