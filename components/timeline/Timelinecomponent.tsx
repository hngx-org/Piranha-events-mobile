import React, { useState, useContext, useEffect } from "react";
import { Button, Card, Surface, Text } from "react-native-paper";
import moment from "moment-timezone";

import {
  StyleSheet,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  RefreshControl
} from "react-native";
import { Entypo, AntDesign, EvilIcons, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../../utils/styles";
import { EventContext, EventContextType, IEventProp } from "../../contexts/EventContext";
import axios from "axios";
import { postRequest } from "../../network/requests";
import { endPoints } from "../../network/api";
import { useUser } from "@clerk/clerk-expo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useEventContext from "../../hooks/useEventContext";

export const SERVER_URL = "https://team-piranha.onrender.com";


interface CardInfo {
  title: string;
  date: string;
  time: string;
  location: string;
  timeInfo: string;
}

export default function Timelinecomponent({ navigation }: { navigation: any }) {
  const [activeText, setActiveText] = useState("Everyone");
  const { eventState, eventDispatch } = useEventContext() as EventContextType;
  const [refreshing, setRefreshing] = useState(false);

  const { user } = useUser();

  const [eventmain, setEventmain] = useState<CardInfo[] | null>(null);
  const [statusData, setstatusData] = useState("")



  const GetToken = async () => {
    const res = await postRequest(endPoints.auth.login, {
      email: user?.emailAddresses[0].emailAddress,
      pass_id: user?.id,
    });
    await AsyncStorage.setItem("token", res?.result?.data.data.token);
  };

  useEffect(() => {
    GetToken();
  }, []);
  const contextValue = useEventContext() as any;

  const fetchAllEventsFromAPI = async () => {
    try {
      const response = await axios.get(
        "https://team-piranha.onrender.com/api/events"
      );
      const status = response.data?.status;
      const events = response.data?.data; // Assuming your API returns event data as JSON

      console.log({ events });

      if (events) {
        // Sort events by created_at in descending order
        events.sort((a, b) => {
          const dateA = new Date(a.created_at);
          const dateB = new Date(b.created_at);
          return dateB - dateA;
        });

        setEventmain(events)

      }

      setstatusData(status)

      eventDispatch({ type: "FETCH_ALL_EVENTS", payload: events });
    } catch (error) {
      // Handle errors here

      throw error;
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchAllEventsFromAPI();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000); // Simulate a delay
  };

  useEffect(() => {
    fetchAllEventsFromAPI();
  }, []);







  function getEventStatus(start_time, end_time) {
    const currentTime = moment();
    const startTime = moment(start_time);
    const endTime = moment(end_time);

    if (currentTime.isBetween(startTime, endTime)) {
      return "Live";
    } else if (currentTime.isBefore(startTime)) {
      const daysUntilStart = startTime.diff(currentTime, "days");
      return `Starts in ${daysUntilStart} day${daysUntilStart === 1 ? "" : "s"}`;
    } else if (currentTime.isAfter(endTime)) {
      return "Ended";
    } else {
      return "Upcoming";
    }
  }


  const renderItem = ({ item }: { item: any }) => {


    const startTime = moment(item.time).tz("Africa/Lagos");
    const endTime = moment(startTime).add(4, "hours"); // Assuming the event duration is 4 hours

    const formattedTimeRange = `${startTime.format("h A")} - ${endTime.format(
      "h A"
    )}`;
    const eventStatus = getEventStatus(item.start_time, item.end_time);

    return (
      <Card style={styles.card}>
        <Card.Content
          style={{ flexDirection: "row", justifyContent: "space-between" }}
        >
          <View
            style={{
              flexDirection: "row",
              gap: 5,
              marginBottom: 3,
              alignItems: "center",
              width: "80%",

            }}
          >
            <Image
              source={{
                uri: `${SERVER_URL}${item?.thumbnail}`
              }}
              style={{ width: 84, height: 84, borderRadius: 50 }}
            />
            <View>
              <Text
                style={{
                  color: "#5C3EC8",
                  fontSize: 18,
                  fontWeight: "600",
                  marginVertical: 3,
                }}
                numberOfLines={1}
              >

                {item.title.charAt(0).toUpperCase() + item.title.slice(1)}
              </Text>

              <Text
                style={{
                  fontWeight: "600",
                  fontSize: 12,
                  color: "#F2EFEA",
                  marginVertical: 3,
                }}
                numberOfLines={1}
              >
                {/* {item.location} */}
                {item.location.charAt(0).toUpperCase() + item.location.slice(1)}

              </Text>

              <Text
                style={{
                  color: "#F2EFEA",
                  fontSize: 10,
                  fontWeight: "600",
                  marginVertical: 3,
                }}
                numberOfLines={1}
              >
                {/* {item.start_time} */}

                {moment(item.start_time).format("MMMM DD, YYYY")}
              </Text>

              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
              >
                <Image
                  source={require("../../assets/clock.png")}
                  style={{ width: 10, height: 10 }}
                />

                <Text
                  style={{
                    fontWeight: "600",
                    fontSize: 10,
                    color: "#F2EFEA",
                    marginVertical: 3,
                  }}
                  numberOfLines={1}
                >

                  {formattedTimeRange}
                </Text>
              </View>
            </View>
          </View>
          <View style={{ gap: 65, alignItems: "flex-end", width: "20%" }}>
            <Entypo name="dots-three-horizontal" size={20} color="white" />



            {eventStatus === "Live" ? (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Entypo name="dot-single" size={24} color="green" />
                <Text
                  style={{ color: "#571FCD", fontWeight: "700", fontSize: 12 }}
                >
                  LIVE
                </Text>
              </View>
            ) : (
              <View style={{ alignItems: "center" }}>
                <Image
                  source={require("../../assets/clock.png")}
                  style={{ width: 10, height: 10 }}
                />

                <Text
                  style={{ color: "#7B7B7B", fontWeight: "700", fontSize: 12 }}
                >
                  {eventStatus}
                </Text>
              </View>
            )}
          </View>
        </Card.Content>
      </Card>
    )
  }

  return (
    <Surface style={styles.container}>
      <ImageBackground
        source={require("../../assets/bg.png")}
        resizeMode="stretch"
        style={{ flex: 1, marginHorizontal: 15 }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingVertical: 10,
          }}
        >
          <Text
            style={{
              fontWeight: "700",
              fontSize: 24,
              color: "white",
            }}
          >
            Timeline
          </Text>
          <View style={{ flexDirection: "row", gap: 10 }}>
            <TouchableOpacity
              style={{
                backgroundColor: "#1B1B1B",
                width: 37,
                height: 37,
                borderRadius: 50,
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={() => navigation.navigate("SearchEvent")}
            >
              <AntDesign name="search1" size={20} color="white" />
            </TouchableOpacity>

            <View
              style={{
                backgroundColor: "#1B1B1B",
                width: 37,
                height: 37,
                borderRadius: 50,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ionicons name="notifications" size={20} color="white" />
            </View>
          </View>
        </View>

        {/* <ScrollView
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
        > */}

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingVertical: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              gap: 10,
              marginBottom: 10,
            }}
          >
            <Button
              mode={`${activeText === "Everyone" ? "contained" : "outlined"}`}
              onPress={() => setActiveText("Everyone")}
              style={[
                {
                  borderColor: "#9d7ae8",

                  backgroundColor:
                    activeText === "Everyone" ? "#9d7ae8" : "transparent", // Set background color based on activeText
                },
              ]}
              labelStyle={{ color: "#FFFFFF" }} // Set text color based on activeText
            >
              Everyone
            </Button>

            <Button
              mode={`${activeText === "Friends" ? "contained" : "outlined"}`}
              onPress={() => setActiveText("Friends")}
              style={[
                {
                  borderColor: "#9d7ae8",
                  backgroundColor:
                    activeText === "Friends" ? "#9d7ae8" : "transparent", // Set background color based on activeText
                },
              ]}
              labelStyle={{ color: "#FFFFFF" }} // Set text color based on activeText
            >
              Friends
            </Button>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => navigation.navigate("CreateEvent")}
            >
              <AntDesign name="pluscircle" size={40} color="#9d7ae8" />
            </TouchableOpacity>
          </View>
        </View>

        {/* <View style={{ flex: 1 }}>
            {eventmain && eventmain.length > 0 ? (
              <FlatList
                data={eventmain}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                showsVerticalScrollIndicator={false}
              />
            ) : (
              <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                {statusData === "success" ? (
                  <View style={{ justifyContent: "center", alignItems: "center" }}>
                    <MaterialCommunityIcons
                      name="flask-empty-minus-outline"
                      size={24}
                      color="white"
                    />
                    <Text style={{ color: "white" }}>No events found</Text>
                  </View>
                ) : (
                  <Text style={{ color: "white" }}>Loading</Text>
                )}
              </View>
            )}
          </View> */}


        <View style={{ flex: 1 }}>
          {eventState.events && eventState.events.length > 0 ? (
            <FlatList
              data={eventState.events}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
              showsVerticalScrollIndicator={false}
              refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}

            />
          ) : (
            <View
              style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
            >
              {statusData === "success" ? (
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                  <MaterialCommunityIcons
                    name="flask-empty-minus-outline"
                    size={24}
                    color="white"
                  />
                  <Text style={{ color: "white" }}>No events found</Text>
                </View>
              ) : (
                <Text style={{ color: "white" }}>Loading</Text>
              )}
            </View>
          )}
        </View>


        {/* </ScrollView> */}

      </ImageBackground>
    </Surface >
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: "13%",
    flex: 1,
    backgroundColor: colors.dark,
  },
  card: {
    backgroundColor: "#1B1B1B",

    borderRadius: 10,
    marginBottom: 15,
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
