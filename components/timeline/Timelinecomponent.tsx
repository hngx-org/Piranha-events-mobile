import React, { useState } from "react";
import { Button, Card, Surface, Text } from "react-native-paper";
import {
  StyleSheet,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { Entypo, AntDesign, EvilIcons, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../../utils/styles";

interface CardInfo {
  title: string;
  date: string;
  time: string;
  location: string;
  timeInfo: string;
}

export default function Timelinecomponent({ navigation }: { navigation: any }) {
  const [activeText, setActiveText] = useState("Everyone");

  const cardData: CardInfo[] = [
    {
      title: "Football game",
      date: "May 20, 2023",
      time: " 4 - 6 PM",
      location: "Teslim Balogun Stadium",
      timeInfo: "Today",
    },
    {
      title: "Concert",
      date: "June 5, 2023",
      time: " 7 PM - 10 PM",
      location: "City Arena",
      timeInfo: " 3 weeks",
    },
    {
      title: "Birthday Party",
      date: "July 10, 2023",
      time: " 2 PM - 6 PM",
      location: "123 Main Street",
      timeInfo: " 2 months",
    },

    {
      title: "Birthday Party",
      date: "July 10, 2023",
      time: " 2 PM - 6 PM",
      location: "123 Main Street",
      timeInfo: " 2 months",
    },
    {
      title: "Birthday Party",
      date: "July 10, 2023",
      time: " 2 PM - 6 PM",
      location: "123 Main Street",
      timeInfo: " 2 months",
    },
    {
      title: "Birthday Party",
      date: "July 10, 2023",
      time: " 2 PM - 6 PM",
      location: "123 Main Street",
      timeInfo: " 2 months",
    },
    {
      title: "Birthday Party",
      date: "July 10, 2023",
      time: " 2 PM - 6 PM",
      location: "123 Main Street",
      timeInfo: "2 months",
    },
    {
      title: "Birthday Party",
      date: "July 10, 2023",
      time: " 2 PM - 6 PM",
      location: "123 Main Street",
      timeInfo: " 2 months",
    },
    // Add more card objects as needed
  ];

  const renderItem = ({ item }: { item: CardInfo }) => (
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
          }}
        >
          <Image
            source={{
              uri: "https://assets.goal.com/v3/assets/bltcc7a7ffd2fbf71f5/bltca46ddd15559987a/635906e3b9100310ea900b42/Nike-2022-23-winter-premier-league-ball.png",
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
                {item.time}
              </Text>
            </View>
          </View>
        </View>
        <View style={{ gap: 65, alignItems: "flex-end" }}>
          <Entypo name="dots-three-horizontal" size={20} color="white" />

          {item.timeInfo === "Today" ? (
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
                {item.timeInfo}
              </Text>
            </View>
          )}
        </View>
      </Card.Content>
    </Card>
  );

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

        <View style={{ flex: 1 }}>
          <FlatList
            data={cardData}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </ImageBackground>
    </Surface>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: "13%",
    paddingHorizontal: "5%",
    flex: 1,
    backgroundColor: colors.dark,
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
});
