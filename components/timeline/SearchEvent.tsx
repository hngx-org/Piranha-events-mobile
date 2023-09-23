import React, { useState, useEffect } from "react";
import {
  ScrollView,
  RefreshControl,
  View,
  FlatList,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Image
} from "react-native";
import {
  Text,
  Card,
  Surface,
} from "react-native-paper";

import { Entypo, AntDesign, EvilIcons, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";


import axios from "axios";
import moment from "moment-timezone";
import { EventContextType } from "../../contexts/EventContext";
import useEventContext from "../../hooks/useEventContext";

interface CardInfo {
  title: string;
  date: string;
  time: string;
  location: string;
  timeInfo: string;
  thumbnail: any
}

export default function SearchEvent({
  navigation,
}: {
  navigation: any;
}) {
  const [activeText, setActiveText] = useState("Everyone");

  const { eventState, eventDispatch } = useEventContext() as EventContextType;

  console.log({ www: eventState });

  console.log("this is me ");



  const [isSearching, setIsSearching] = useState(false);

  const [eventmain, setEventmain] = useState<CardInfo[] | null>(null);
  const [statusData, setstatusData] = useState("");

  const SERVER_URL = "https://team-piranha.onrender.com";







  const [searchQuery, setSearchQuery] = useState("");

  const [filteredCardData, setFilteredCardData] = useState<any | null>(
    eventState?.events
  );






  const filterCardData = (query: string) => {
    if (query.trim() === "") {
      setIsSearching(false); // Not searching, show all items
      setFilteredCardData(eventState?.events);
    } else {
      setIsSearching(true); // Searching, show filtered items
      const filteredData = eventState?.events?.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredCardData(filteredData);
    }
  };
  const renderItem = ({ item }: { item: any }) => {
    const startTime = moment(item.time).tz("America/New_York");
    const endTime = moment(startTime).add(4, "hours"); // Assuming the event duration is 4 hours

    const formattedTimeRange = `${startTime.format("h A")} - ${endTime.format(
      "h A"
    )}`;

    return (
      <Card style={styles.card}>
        <Card.Content style={{ position: "relative" }}>
          <View style={{ position: "absolute", right: 20, top: 10 }}>
            <Entypo name="dots-three-horizontal" size={20} color="white" />
          </View>

          <View
            style={{
              flexDirection: "row",
              gap: 5,
              marginBottom: 3,
              alignItems: "center",
            }}
          >
            <Image
              source={{
                uri: `${SERVER_URL}${item?.thumbnail}`,
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
              >
                {item.title}
              </Text>
              <Text
                style={{
                  fontWeight: "600",
                  fontSize: 12,
                  color: "#F2EFEA",
                  marginVertical: 3,
                }}
              >
                {item.location}
              </Text>

              <Text
                style={{
                  color: "#F2EFEA",
                  fontSize: 10,
                  fontWeight: "600",
                  marginVertical: 3,
                }}
              >
                {item.date}
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
                >
                  {formattedTimeRange}
                </Text>
              </View>
            </View>
          </View>

          <View
            style={{ position: "absolute", right: 20, bottom: 20, width: "100%" }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                borderWidth: 1,
                borderColor: "#5C3EC8",
                borderRadius: 14,
                paddingHorizontal: 10,
                paddingVertical: 2,
                alignSelf: "flex-end",
              }}
            >
              <Text style={{ color: "#7B7B7B", fontWeight: "700", fontSize: 12 }}>
                Remove{" "}
              </Text>
              <AntDesign
                name="close"
                size={12}
                color="black"
                style={styles.customIcon}
              />
            </View>
          </View>
        </Card.Content>
      </Card>
    );
  };

  const [refreshing, setRefreshing] = useState(false);



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
        events.sort((a: any, b: any) => {
          const dateA: any = new Date(a.created_at);
          const dateB: any = new Date(b.created_at);
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

  // Use useEffect to fetch all events when the component mounts
  useEffect(() => {
    fetchAllEventsFromAPI();
  }, []); // The empty dependency array ensures this effect runs once when the component mounts





  return (
    <Surface style={styles.container}>
      <ImageBackground
        source={require("../../assets/bg.png")}
        resizeMode="stretch"
        style={{ flex: 1 }}
      >
        <View
          style={{
            flexDirection: "row",
            paddingVertical: 10,
            paddingHorizontal: "5%",
            alignItems: "center",
          }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Entypo name="chevron-small-left" size={30} color="white" />
          </TouchableOpacity>
          <View style={{ flex: 1, alignItems: "center" }}>
            <Text
              style={{
                fontWeight: "700",
                fontSize: 24,
                color: "white",
              }}
            >
              Search Event
            </Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            paddingVertical: 10,
            backgroundColor: "#1A1A1A",
            marginHorizontal: "5%",
            borderRadius: 27,
            paddingLeft: "5%",
            marginBottom: 40,
          }}
        >
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
            <EvilIcons name="search" size={35} color="white" />
          </View>

          <TextInput
            style={{ color: "#B0B0B0", width: "80%" }}
            placeholder="Search"
            onChangeText={(text) => {
              setSearchQuery(text);
              filterCardData(text);
            }}
            placeholderTextColor="#B0B0B0"
          />
        </View>

        {/* 
        <View style={{ flex: 1, paddingHorizontal: "5%" }}>
          {filteredCardData && filteredCardData.length > 0 ? (
            <FlatList
              data={filteredCardData}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
              showsVerticalScrollIndicator={false}

              refreshControl={
                <RefreshControl refreshing={false} onRefresh={handleRefresh} />
              }

            />
          ) : (
            <View
              style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
            >
              {statusData === "success" ? (
                <View style={{ justifyContent: "center", alignItems: "center" }}>

                  <TouchableOpacity onPress={handleRefresh}>

                    <MaterialCommunityIcons
                      name="flask-empty-minus-outline"
                      size={24}
                      color="white"
                    />

                  </TouchableOpacity>

                  <Text style={{ color: "white" }}>No events found</Text>
                </View>
              ) : (
                <Text style={{ color: "white" }}>Loading</Text>
              )}
            </View>
          )}
        </View> */}

        <View style={{ flex: 1, paddingHorizontal: "5%" }}>
          {isSearching ? ( // Display filtered items when searching
            filteredCardData && filteredCardData.length > 0 ? (
              <FlatList
                data={filteredCardData}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                showsVerticalScrollIndicator={false}
              // refreshControl={
              //   <RefreshControl refreshing={false} onRefresh={handleRefresh} />
              // }
              />
            ) : (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {statusData === "success" ? (
                  <View
                    style={{ justifyContent: "center", alignItems: "center" }}
                  >
                    <TouchableOpacity onPress={handleRefresh}>
                      <MaterialCommunityIcons
                        name="flask-empty-minus-outline"
                        size={24}
                        color="white"
                      />
                    </TouchableOpacity>
                    <Text style={{ color: "white" }}>No events found click to refresh</Text>
                  </View>
                ) : (
                  <Text style={{ color: "white" }}>Loading</Text>
                )}
              </View>
            )
          ) : (
            // Display all items initially
            <FlatList
              data={eventState?.events}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
              showsVerticalScrollIndicator={false}
              refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
            />
          )}
        </View>
      </ImageBackground>
    </Surface>
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
  customIcon: {
    color: "red",
    fontWeight: "700",
  },
});
