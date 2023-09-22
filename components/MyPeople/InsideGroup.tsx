import { FlatList, SafeAreaView, ScrollView, StyleSheet, StatusBar, Text, View } from "react-native";
import React from "react";
import ScreenHeader from "../ScreenHeader";
import { appImages } from "../../assets";
import InsideGroupItem from "./InsideGroupItem";
import Wrapper from "../Wrapper";
import { useNavigation } from "@react-navigation/native";

const InsideGroup = () => {
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
      <ScreenHeader containerStyle={{ marginBottom: 30 }} title="My People" onPressOne={navigation.goBack} />

      <FlatList data={Groups} renderItem={({ item, index }) => <InsideGroupItem group={item} index={index} />} />
    </Wrapper>
  );
};

export default InsideGroup;

const styles = StyleSheet.create({});
