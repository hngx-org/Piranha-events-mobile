import { FlatList, SafeAreaView, ScrollView, StyleSheet, StatusBar, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import ScreenHeader from "../ScreenHeader";
import { appImages } from "../../assets";
import InsideGroupItem from "./InsideGroupItem";
import Wrapper from "../Wrapper";
import { useNavigation } from "@react-navigation/native";
import { getRequest } from "../../network/requests";
import { endPoints } from "../../network/api";

const InsideGroup = () => {
  const navigation = useNavigation();

  const [events, setEvents] = useState([]);
  const [isLoadingEvents, setIsLoadingEvents] = useState<boolean>(false);

  const getEvents = async () => {
    setIsLoadingEvents(true);

    const res = await getRequest(endPoints.events.eventsList);

    if (res.isSuccess) {
      setIsLoadingEvents(false);
      setEvents(res?.data);
    }

    if (!res.isSuccess) {
      setIsLoadingEvents(false);
    }
  };

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

  useEffect(() => {
    if (events?.result === null) {
    }
  }, [events.length]);

  return (
    <Wrapper propStyle={{ flex: 1, paddingTop: StatusBar.currentHeight, paddingHorizontal: 29 }}>
      <ScreenHeader containerStyle={{ marginBottom: 30 }} title="My People" onPressOne={navigation.goBack} />

      <FlatList data={Groups} renderItem={({ item, index }) => <InsideGroupItem group={item} index={index} />} />
    </Wrapper>
  );
};

export default InsideGroup;

const styles = StyleSheet.create({});
