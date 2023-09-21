import { StyleSheet, View, Text, ImageBackground } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import AppScreen from "../components/AppScreen";
import CalendarComponent from "../components/CalendarComponent/Index";
import { colors } from "../utils/styles";

export default function Calendar() {
  return (
    <AppScreen style={styles.container}>
      <ImageBackground
        style={styles.imgBck}
        source={require("../assets/bg.png")}
      >
        <View style={styles.header}>
          <Text style={styles.headerTxt}>Calendar</Text>
          <View style={styles.headerIcon}>
            <MaterialIcons name="search" size={20} color={"white"} />
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <CalendarComponent />
        </View>
      </ImageBackground>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark,
  },

  imgBck: {
    flex: 1,
  },

  header: {
    padding: 20,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerIcon: {
    width: 37,
    height: 37,
    borderRadius: 30,
    backgroundColor: "#1B1B1B",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTxt: {
    fontSize: 22,
    fontWeight: "700",
    color: "white",
  },
});
