import {
  DimensionValue,
  Image,
  ImageSourcePropType,
  useWindowDimensions,
} from "react-native";

interface Props {
  size?: number;
  imageUri?: string;
}

export default function PlantlyImage({ imageUri, size }: Props) {
  const { width } = useWindowDimensions();

  const imageSize = size || Math.min(width / 1.5, 400);

  return (
    <Image
      source={imageUri ? { uri: imageUri } : require("../assets/plantly.png")}
      style={{
        width: imageSize,
        height: imageSize,
        borderRadius: 6,
      }}
    />
  );
}
