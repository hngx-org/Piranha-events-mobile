import { FlatList, SafeAreaView, ScrollView, StyleSheet, StatusBar, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import ScreenHeader from "../components/ScreenHeader";
import { appImages } from "../assets";
import MyPeopleItem from "../components/MyPeople/MyPeopleItem";
import Wrapper from "../components/Wrapper";
import AddNewGroup from "../components/MyPeople/AddNewGroup";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { StackNavigationType } from "../AuthScreen";
import { getRequest, postRequest } from "../network/requests";
import { endPoints } from "../network/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserContext, UserContextProps } from "../contexts/UserContext";

const MyPeople = () => {
  const navigation: StackNavigationType = useNavigation();


  const user = useContext<UserContextProps | null>(UserContext);

  const userInfo = user?.userInfo;

  console.log(userInfo?.id, userInfo?.token);

  const getGroups = async () => {
    console.log(endPoints.groups.getForUser(userInfo?.id))
    const res = await getRequest(endPoints.groups.getForUser(userInfo?.id), {
      Authorization: `Bearer ${userInfo?.token}`,
    });

    console.log(res?.isSuccess);
    console.log(res);
  };

  useEffect(() => {
    getGroups();
  }, []);

  const Groups = [
    {
      id: 1,
      name: "Tech Buddies",
      event: [{ name: "Event 1" }],
      messages: ["one", "two"],
      image: appImages.myPeople,
    },
    {
      id: 2,
      name: "Techies",
      event: [{ name: "Event 1" }],
      messages: ["one", "two"],
      image: appImages.myPeople,
    },
    {
      id: 3,
      name: "Tech Buddies",
      event: [{ name: "Event 1" }],
      messages: ["one", "two"],
      image: appImages.myPeople,
    },
    {
      id: 4,
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
        renderItem={({ item, index }) => <MyPeopleItem group={item} index={index} id={item.id} />}
      />
    </Wrapper>
  );
};

export default MyPeople;

const styles = StyleSheet.create({});
