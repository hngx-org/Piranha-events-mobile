import React, { useState, useEffect } from "react";
import { Button, Card, Surface, Text } from "react-native-paper";
import {
  StyleSheet,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  TextInput,
  ImageBackground,
} from "react-native";
import { Entypo, AntDesign, EvilIcons, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import moment from "moment-timezone";


interface CardInfo {
  title: string;
  date: string;
  time: string;
  location: string;
  timeInfo: string;
}

export default function SearchEvent({ navigation }: { navigation: any }) {
  const [activeText, setActiveText] = useState("Everyone");

  const [eventmain, setEventmain] = useState<CardInfo[] | null>(null);
  const [statusData, setstatusData] = useState("")


  const SERVER_URL = "https://team-piranha.onrender.com";



  const cardData: CardInfo[] = [



    {
      title: "Birthday Party",
      date: "July 10, 2023",
      time: " 2 PM - 6 PM",
      location: "123 Main Street",
      timeInfo: " 2 months",
    }


  ];



  const fetchAllEventsFromAPI = async () => {
    try {
      const response = await axios.get(
        "https://team-piranha.onrender.com/api/events"
      );


      console.log({ name: response.data });

      const events = response.data?.data;
      const status = response.data?.status; // Assuming your API returns event data as JSON
      // Assuming your API returns event data as JSON

      setstatusData(status)
      setEventmain(events)


      // eventDispatch({ type: "FETCH_ALL_EVENTS", payload: events });
    } catch (error) {
      // Handle errors here

      throw error;
    }
  };

  // Use useEffect to fetch all events when the component mounts
  useEffect(() => {
    fetchAllEventsFromAPI();
  }, []); // The empty dependency array ensures this effect runs once when the component mounts



  const [searchQuery, setSearchQuery] = useState("");

  // const [filteredCardData, setFilteredCardData] =
  //   useState<CardInfo[]>(eventmain);


  const [filteredCardData, setFilteredCardData] = useState<CardInfo[] | null>(eventmain);





  const filterCardData = (query: string) => {
    const filteredData = eventmain?.filter((item) =>
      item.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredCardData(filteredData);
  };
  const renderItem = ({ item }: { item: CardInfo }) => {

    const startTime = moment(item.time).tz('America/New_York');
    const endTime = moment(startTime).add(4, 'hours'); // Assuming the event duration is 4 hours

    const formattedTimeRange = `${startTime.format('h A')} - ${endTime.format('h A')}`;



    return (

      <Card style={styles.card} >
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
      </Card >
    )

  }


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
                paddingLeft: "5%",
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

          {/* <TextInput style={{ color: "white", width: "80%", }} placeholder="Search" /> */}

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

        {/* <View style={{ flex: 1, paddingHorizontal: "5%" }}>
          <FlatList
            data={filteredCardData}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
          />
        </View> */}


        <View style={{ flex: 1, paddingHorizontal: "5%" }}>
          {filteredCardData && filteredCardData.length > 0 ? (
            <FlatList
              data={filteredCardData}
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

  customIcon: {
    color: "red",
    fontWeight: "700",
  },
});
