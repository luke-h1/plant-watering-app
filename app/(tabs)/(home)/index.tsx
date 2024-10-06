import PlantCard from "@/components/PlantCard";
import PlantlyButton from "@/components/PlantlyButton";
import usePlantStore from "@/store/plantStore";
import theme from "@/styles/theme";
import { useRouter } from "expo-router";
import { FlatList, StyleSheet } from "react-native";

// /(tabs)/(home)/index.tsx
// index.tsx -> /
const HomePage = () => {
  const plants = usePlantStore((state) => state.plants);
  const router = useRouter();
  console.log("plants", plants);

  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      data={plants}
      renderItem={({ item, index }) => <PlantCard plant={item} key={index} />}
      ListEmptyComponent={
        <PlantlyButton
          title="Add your first plant"
          onPress={() => router.navigate("/")}
        />
      }
    />
  );
};
export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.color.white,
  },
  contentContainer: {
    // overflow bottom of screen is cut off so place it on the content container
    padding: 12,
  },
});
