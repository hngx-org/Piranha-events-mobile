import { FlatList, SafeAreaView, ScrollView, StyleSheet, StatusBar, Text, View } from "react-native";
import React, { useState } from "react";
import ScreenHeader from "../components/ScreenHeader";
import { appImages } from "../assets";
import MyPeopleItem from "../components/MyPeople/MyPeopleItem";
import Wrapper from "../components/Wrapper";
import AddNewGroup from "../components/MyPeople/AddNewGroup";
import { useNavigation } from "@react-navigation/native";

const MyPeople = () => {
  // const [showAddBox, setShowAddBox] = useState(false);
  const navigation = useNavigation();

  const Groups = [
    {
      name: "Tech Buddies",
      event: [{ name: "Event 1" }],
      messages: ["one", "two"],
      image: appImages.myPeople,
    },
    {
      name: "Techies",
      event: [{ name: "Event 1" }],
      messages: ["one", "two"],
      image: appImages.myPeople,
    },
    {
      name: "Tech Buddies",
      event: [{ name: "Event 1" }],
      messages: ["one", "two"],
      image: appImages.myPeople,
    },
    {
      name: "Techies",
      event: [{ name: "Event 1" }],
      messages: ["one", "two"],
      image: appImages.myPeople,
    },
  ];

  return (
    <Wrapper propStyle={{ flex: 1, paddingTop: StatusBar.currentHeight, paddingHorizontal: 29 }}>
      <ScreenHeader title="My People" level={0} onPressTwo={() => navigation.navigate("AddNewGroup")} />

      <FlatList
        data={Groups}
        numColumns={2}
        renderItem={({ item, index }) => <MyPeopleItem id={index} group={item} index={index} />}
      />
    </Wrapper>
  );
};

export default MyPeople;

const styles = StyleSheet.create({});
