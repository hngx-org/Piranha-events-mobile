import { FlatList, SafeAreaView, ScrollView, StyleSheet, StatusBar, Text, View, RefreshControl } from "react-native";
import React, { useEffect, useState } from "react";
import ScreenHeader from "../ScreenHeader";
import { appImages } from "../../assets";
import InsideGroupItem from "./InsideGroupItem";
import Wrapper from "../Wrapper";
import { useNavigation } from "@react-navigation/native";
import { getRequest } from "../../network/requests";
import { endPoints } from "../../network/api";
import EmptyList from "./EmptyList";

const InsideGroup = ({ route }) => {
  const navigation = useNavigation();
  const groupId = route?.params?.id;
  const userInfo = route?.params?.userAuth;
  const groupName = route?.params?.name;

  console.log(userInfo)

  const [events, setEvents] = useState([]);
  const [isLoadingEvents, setIsLoadingEvents] = useState<boolean>(false);

  const [refreshing, setRefreshing] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);


  const getEvents = async () => {
    setIsLoadingEvents(true);

    console.log(29, endPoints.groups.groupEvent(groupId))
    const res = await getRequest(endPoints.groups.groupEvent(groupId), { Authorization: `Bearer ${userInfo?.token}` });

    if (res.isSuccess) {
      console.log("success");
      setIsLoadingEvents(false);
      setEvents(res?.result?.data?.events);
      // console.log(res?.result?.data?.data)
    }

    if (!res.isSuccess) {
      setIsLoadingEvents(false);
      // console.log(res?.result?.response, Object.keys(res?.result))
      console.log(42, 'failure')
    }

    console.log(46, res.result.data);
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // getGroups();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  useEffect(() => {
    if (events?.length === 0) {
      getEvents();
    }
  }, [events?.length]);

  console.log(60, events);

  return (
    <Wrapper propStyle={{ flex: 1, paddingTop: StatusBar.currentHeight, paddingHorizontal: 29 }}>
      <ScreenHeader containerStyle={{ marginBottom: 30 }} title={groupName} onPressOne={navigation.goBack} />

      <FlatList
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        data={events}
        renderItem={({ item, index }) => <InsideGroupItem key={index} event={item} index={index} />}
        ListEmptyComponent={<EmptyList isLoading={isLoadingEvents} emptyMesage="No Event for this group" />}
      />
    </Wrapper>
  );
};

export default InsideGroup;

const styles = StyleSheet.create({});
