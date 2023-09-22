import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import { StyleSheet } from "react-native";
import Timeline from "../hometabs/Timeline";
import MyPeople from "../hometabs/MyPeople";
import Calendar from "../hometabs/Calendar";
import Settings from "../hometabs/Settings";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "../utils/styles";

const Tab = createMaterialBottomTabNavigator();

export default function Home() {
  return (
    <Tab.Navigator
      initialRouteName="Timeline"
      activeColor="#5C3EC8"
      inactiveColor="#F2EFEA"
      shifting={false}
      style={{ backgroundColor: colors.dark }}
      barStyle={{
        backgroundColor: "black",
        borderTopStartRadius: 32,
        borderTopEndRadius: 32,
        overflow: "hidden",
      }}
      theme={{ colors: { secondaryContainer: "transparent" } }}
    >
      <Tab.Screen
        name="Timeline"
        component={Timeline}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <MaterialCommunityIcons
              name="chart-timeline-variant"
              color={focused ? "#5C3EC8" : "#F2EFEA"}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="My People"
        component={MyPeople}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name="people-outline"
              color={focused ? "#5C3EC8" : "#F2EFEA"}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Calendar"
        component={Calendar}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name="calendar-outline"
              color={focused ? "#5C3EC8" : "#F2EFEA"}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name="ios-settings-outline"
              color={focused ? "#5C3EC8" : "#F2EFEA"}
              size={26}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
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
