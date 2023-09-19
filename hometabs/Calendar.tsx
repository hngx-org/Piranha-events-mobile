import { Surface, Text } from "react-native-paper";
import { StyleSheet } from "react-native";

export default function Calendar() {

     return (
        <Surface style={styles.container}>
            <Text>This is the Calendar area</Text>
        </Surface>
     )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#ffffff",
    },
  
    textH: {
      margin: 20,
    },
  });
  