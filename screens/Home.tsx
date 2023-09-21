import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Surface, Text, BottomNavigation } from "react-native-paper";
import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import { StyleSheet } from "react-native";
import { useState } from "react";
import Timeline from "../hometabs/Timeline";
import MyPeople from "../hometabs/MyPeople";
import Calendar from "../hometabs/Calendar";
import Settings from "../hometabs/Settings";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import InsideGroup from "../components/MyPeople/InsideGroup";

const Tab = createMaterialBottomTabNavigator();

export default function Home() {
  return (
    <Tab.Navigator
      initialRouteName="Timeline"
      activeColor="#5C3EC8"
      inactiveColor="white"
      shifting={false}
      barStyle={{
        backgroundColor: "black",
        borderTopStartRadius: 10,
        borderTopEndRadius: 10,
      }}
    >
      <Tab.Screen
        name="Timeline"
        component={Timeline}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <MaterialCommunityIcons
              name="chart-timeline-variant"
              color={focused ? "#5C3EC8" : "white"}
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
              name="people"
              color={focused ? "#5C3EC8" : "white"}
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
              name="calendar"
              color={focused ? "#5C3EC8" : "white"}
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
              name="settings"
              color={focused ? "#5C3EC8" : "white"}
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
