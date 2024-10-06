import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import * as FileSystem from "expo-file-system";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface Plant {
  id: string;
  name: string;
  imageUri?: string;
  wateringFrequencyDays: number;
  lastWateredAt?: number;
}

interface PlantState {
  nextId: number;
  plants: Plant[];
  addPlant: ({
    name,
    wateringFrequencyDays,
    imageUri,
  }: {
    name: string;
    wateringFrequencyDays: number;
    imageUri?: string;
  }) => void;
  removePlant: (id: string) => void;
  waterPlant: (id: string) => void;
}

const usePlantStore = create(
  persist<PlantState>(
    (set) => ({
      plants: [],
      nextId: 1,
      addPlant: async ({ name, wateringFrequencyDays, imageUri }) => {
        const savedImageUri = `${FileSystem.documentDirectory}${new Date().getTime()}-${imageUri?.split("/").slice(-1)[0]}`;

        if (imageUri) {
          await FileSystem.copyAsync({
            from: imageUri,
            to: savedImageUri,
          });
        }

        return set((state) => {
          return {
            ...state,
            nextId: state.nextId + 1,
            plants: [
              {
                id: String(state.nextId),
                imageUri: imageUri ? savedImageUri : undefined,
                name,
                wateringFrequencyDays,
              },
              ...state.plants,
            ],
          };
        });
      },
      removePlant: (id: string) => {
        return set((state) => {
          return {
            ...state,
            plants: state.plants.filter((plant) => plant.id !== id),
          };
        });
      },
      waterPlant: (id: string) => {
        return set((state) => {
          return {
            ...state,
            plants: state.plants.map((plant) => {
              if (plant.id === id) {
                return {
                  ...plant,
                  lastWateredAt: Date.now(),
                };
              }
              return plant;
            }),
          };
        });
      },
    }),
    {
      name: "plant-store",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default usePlantStore;
