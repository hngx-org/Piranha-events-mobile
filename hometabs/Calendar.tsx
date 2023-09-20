import { StyleSheet, View, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import AppScreen from "../components/AppScreen";
import CalendarComponent from "../components/CalendarComponent/Index";

export default function Calendar() {
  return (
    <AppScreen style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTxt}>Calendar</Text>
        <View style={styles.headerIcon}>
          <MaterialIcons name="search" size={17} color={"white"} />
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <CalendarComponent />
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },

  header: {
    padding: 20,
    paddingBottom: 0,
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
    fontWeight: "bold",
  },
});
