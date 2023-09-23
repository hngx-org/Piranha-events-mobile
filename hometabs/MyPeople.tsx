import { FlatList, RefreshControl, StyleSheet, StatusBar, Text, View } from "react-native";
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
import { ToastMessage } from "../components/MyPeople/ToastMessage";
import EmptyList from "../components/MyPeople/EmptyList";

const MyPeople = () => {
  const navigation: StackNavigationType = useNavigation();

  const user = useContext<UserContextProps | null>(UserContext);
  const userInfo = user?.userInfo;

  console.log(userInfo?.id)

  const [refreshing, setRefreshing] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastObj, setToastObj] = useState<{ message: string; type: string; text1: string }>({
    message: "",
    type: "",
    text1: "",
  });

  const [groups, setGroups] = useState([]);
  const [response, setResponse] = useState<{ isSuccess: boolean | null; result: any }>({
    isSuccess: null,
    result: null,
  });

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getGroups();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const getGroups = async () => {
    setIsLoading(true);
    const res = await getRequest(endPoints.groups.getForUser(userInfo?.id), {
      Authorization: `Bearer ${userInfo?.token}`,
    });

    console.log(res?.result)

    setResponse(res);
  };

  useEffect(() => {
    if (groups.length === 0) {
      getGroups();
    }
  }, []);

  useEffect(() => {
    if (response.isSuccess !== null && !response.isSuccess) {
      setToastObj({ message: "", type: "error", text1: "Unable to fetch group, pull to refresh" });
      setShowToast(true);
      setResponse({ result: null, isSuccess: null });
      setIsLoading(false);
    }

    if (response.isSuccess !== null && response.isSuccess) {
      setToastObj({ message: "", type: "success", text1: "Groups Fetched Successfully" });
      setShowToast(true);
      setGroups(response?.result?.data?.data);
      setResponse({ result: null, isSuccess: null });
      setIsLoading(false);
    }
  }, [response?.isSuccess]);

  
  return (
    <Wrapper propStyle={{ flex: 1, paddingTop: StatusBar.currentHeight, paddingHorizontal: 29 }}>
      <ScreenHeader title="My People" level={0} onPressTwo={() => navigation.navigate("AddNewGroup")} />

      <FlatList
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        data={groups}
        numColumns={2}
        renderItem={({ item, index }) => <MyPeopleItem key={item?.name} group={item} index={index} id={item?.id} userAuth={{id: userInfo?.id, token: userInfo?.token}} />}
        ListEmptyComponent={<EmptyList isLoading={isLoading} emptyMesage="No Group found" />}
      />

      {showToast ? <ToastMessage showToast={showToast} setShowToast={setShowToast} toastObj={toastObj} /> : null}
    </Wrapper>
  );
};

export default MyPeople;

const styles = StyleSheet.create({});
