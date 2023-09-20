import { FlatList, SafeAreaView, ScrollView, StyleSheet, StatusBar, Text, View } from "react-native";
import React from "react";
import ScreenHeader from "../component/ScreenHeader";
import { appImages } from "../assets";
import MyPeopleItem from "../component/MyPeople/MyPeopleItem";
import Wrapper from "../component/Wrapper";

const MyPeople = () => {
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
  ];

  return (
    <Wrapper propStyle={{ flex: 1, paddingTop: StatusBar.currentHeight, paddingHorizontal: 29, }}>
      <ScreenHeader title="My People" />

      <FlatList
        data={Groups}
        numColumns={2}
        renderItem={({ item, index }) => <MyPeopleItem group={item} index={index} />}
      />
    </Wrapper>
  );
};

export default MyPeople;

const styles = StyleSheet.create({});
