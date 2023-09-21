import React, { useState } from "react";
import { Button, Card, Surface, Text } from "react-native-paper";
import { StyleSheet, View, Image, FlatList, ImageBackground } from "react-native";
import { Entypo, AntDesign, EvilIcons, Ionicons } from "@expo/vector-icons";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Timelinecomponent from "../components/timeline/Timelinecomponent";
import SearchEvent from "../components/timeline/SearchEvent";




const Stack = createNativeStackNavigator();
export default function Timeline() {


  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >


      <Stack.Screen name="Home" component={Timelinecomponent} />
      <Stack.Screen name="SearchEvent" component={SearchEvent} />



    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: "13%",
    flex: 1,
    backgroundColor: "#0f0f0f",
  },
  card: {

    backgroundColor: "#1B1B1B",

    borderRadius: 10,
    marginBottom: 10,
  },
  activeButton: {
    borderBottomColor: "#571FCD",
    borderBottomWidth: 2,
    color: "#33313E",
  },
  inactiveButton: {
    color: "#84838B",
  },
  headerText: {
    fontWeight: "700",
    fontSize: 14,
  },
  borderLine: {
    borderBottomWidth: 1,
    borderBottomColor: "#E6DDF8",
    marginBottom: 10,
  },
});
