import {
  Text,
  StyleSheet,
  TextInput,
  Alert,
  Platform,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import PlantlyImage from "@/components/PlantlyImage";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import usePlantStore from "@/store/plantStore";
import PlantlyButton from "@/components/PlantlyButton";
import theme from "@/styles/theme";

interface FormValues {
  name: string;
  days: string;
}

export default function NewScreen() {
  const [formData, setFormData] = useState<FormValues>({
    name: "",
    days: "",
  });

  const addPlant = usePlantStore((state) => state.addPlant);
  const router = useRouter();
  const [imageUri, setImageUri] = useState<string>("");

  const handleChooseImage = async () => {
    if (Platform.OS === "web") {
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleSubmit = () => {
    if (!formData.name) {
      return Alert.alert("Validation Error", "Give your plant a name");
    }

    if (!formData.days) {
      return Alert.alert(
        "Validation Error",
        `How often does ${name} need to be watered?`
      );
    }

    if (Number.isNaN(Number(formData.days))) {
      return Alert.alert(
        "Validation Error",
        "Watering frequency must be a be a number"
      );
    }

    addPlant({
      name: formData.name,
      wateringFrequencyDays: Number(formData.days),
      imageUri,
    });
    router.navigate("/");
    console.log("Adding plant", formData.name, formData.days);
  };

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      keyboardShouldPersistTaps="handled"
    >
      <TouchableOpacity
        style={styles.centered}
        onPress={handleChooseImage}
        activeOpacity={0.8}
      >
        <PlantlyImage imageUri={imageUri} />
      </TouchableOpacity>
      <Text style={styles.label}>Name</Text>
      <TextInput
        value={formData.name}
        placeholder="E.g. Casper the Cactus"
        autoCapitalize="words"
        onChangeText={(text) => {
          setFormData((prev) => ({
            ...prev,
            name: text,
          }));
        }}
      />
      <Text style={styles.label}>Watering Frequency (every x days)</Text>
      <TextInput
        value={formData.days}
        onChangeText={(text) => {
          setFormData((prev) => ({
            ...prev,
            days: text,
          }));
        }}
        placeholder="E.g. 6"
        keyboardType="number-pad"
      />
      <PlantlyButton title="Add plant" onPress={handleSubmit} />
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.color.white,
  },
  contentContainer: {
    paddingTop: 24,
    paddingHorizontal: 24,
    paddingBottom: 100,
  },
  input: {
    borderWidth: 2,
    borderColor: theme.color.grey,
    padding: 12,
    borderRadius: 6,
    marginBottom: 24,
    fontSize: 18,
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  centered: {
    alignItems: "center",
    marginBottom: 24,
  },
});
