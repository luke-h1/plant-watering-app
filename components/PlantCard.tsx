import { Plant } from "@/store/plantStore";
import theme from "@/styles/theme";
import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import PlantlyImage from "./PlantlyImage";

interface Props {
  plant: Plant;
}

export default function PlantCard({ plant }: Props) {
  return (
    <Link href={`/plants/${plant.id}`} asChild>
      <Pressable style={styles.plantCard}>
        <PlantlyImage size={100} imageUri={plant.imageUri} />
        <View style={styles.details}>
          <Text numberOfLines={1} style={styles.plantName}>
            {plant.name}
          </Text>
          <Text style={styles.subtitle}>
            Water every {plant.wateringFrequencyDays}{" "}
            {plant.wateringFrequencyDays === 1 ? "day" : "days"}
          </Text>
        </View>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  plantCard: {
    flexDirection: "row",
    shadowColor: theme.color.black,
    backgroundColor: theme.color.white,
    borderRadius: 6,
    padding: 12,
    marginBottom: 12,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  details: {
    padding: 14,
    justifyContent: "center",
  },
  plantName: {
    fontSize: 18,
    marginBottom: 4,
  },
  subtitle: {
    color: theme.color.grey,
  },
});
