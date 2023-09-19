import { Surface, Text } from "react-native-paper";
import { StyleSheet, ImageBackground, View } from "react-native";
import LargeTextBox from "../components/LargeTextBox";

const background = require("../assets/images/background_image.jpg");
export default function Event() {
  return (
    <Surface style={styles.container}>
      <ImageBackground
        source={background}
        resizeMode="cover"
        style={styles.backImage}
      >
        <Text variant="headlineMedium" style={styles.screenTitle}>
          This is the Event screen
        </Text>

        <LargeTextBox
          title="Description"
          placeholder="Type event description here"
          style={styles.textBox}
        />

        <Text style={styles.title}>Time Duration</Text>
      </ImageBackground>
    </Surface>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    background: "black",
  },

  backImage: {
    flex: 1,
    background: "orange",
    paddingTop: 40,
    paddingHorizontal: 20,
    gap: 20,
  },

  screenTitle: {
    fontSize: 22,
    textAlign: "center",
  },

  textBox: {
    backgroundColor: "transparent",
    gap: 10,
  },

  title: {
    color: "black",
    fontSize: 18,
    borderRadius: 0,
  },
});
