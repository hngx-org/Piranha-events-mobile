import React, { useState } from "react";
import { Card, Surface, Text } from "react-native-paper";
import { StyleSheet, View, Image, FlatList } from "react-native";
import { Entypo, AntDesign } from "@expo/vector-icons";

interface CardInfo {
  title: string;
  date: string;
  time: string;
  location: string;
  timeInfo: string;
}

export default function Timeline() {
  const [activeText, setActiveText] = useState("Everyone");

  const cardData: CardInfo[] = [
    {
      title: "Football game",
      date: "May 20, 2023",
      time: "Friday 4 - 6 PM",
      location: "Teslim Balogun Stadium",
      timeInfo: "Today",
    },
    {
      title: "Concert",
      date: "June 5, 2023",
      time: "Saturday 7 PM - 10 PM",
      location: "City Arena",
      timeInfo: "In 3 weeks",
    },
    {
      title: "Birthday Party",
      date: "July 10, 2023",
      time: "Sunday 2 PM - 6 PM",
      location: "123 Main Street",
      timeInfo: "In 2 months",
    },

    {
      title: "Birthday Party",
      date: "July 10, 2023",
      time: "Sunday 2 PM - 6 PM",
      location: "123 Main Street",
      timeInfo: "In 2 months",
    }, {
      title: "Birthday Party",
      date: "July 10, 2023",
      time: "Sunday 2 PM - 6 PM",
      location: "123 Main Street",
      timeInfo: "In 2 months",
    }, {
      title: "Birthday Party",
      date: "July 10, 2023",
      time: "Sunday 2 PM - 6 PM",
      location: "123 Main Street",
      timeInfo: "In 2 months",
    }, {
      title: "Birthday Party",
      date: "July 10, 2023",
      time: "Sunday 2 PM - 6 PM",
      location: "123 Main Street",
      timeInfo: "In 2 months",
    }, {
      title: "Birthday Party",
      date: "July 10, 2023",
      time: "Sunday 2 PM - 6 PM",
      location: "123 Main Street",
      timeInfo: "In 2 months",
    },
    // Add more card objects as needed
  ];

  const renderItem = ({ item }: { item: CardInfo }) => (
    <Card style={styles.card}>
      <Card.Content style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View style={{ flexDirection: "row", gap: 5, marginBottom: 3 }}>
          <View>
            <Image
              source={require("../assets/image9.png")}
              style={{ width: 84, height: 88 }}
            />
          </View>
          <View>
            <Text style={{ color: "#9D7AE8", fontSize: 20, fontWeight: "700" }}>
              {item.title}
            </Text>
            <Text style={{ color: "#33313E", fontSize: 18, fontWeight: "700" }}>
              {item.date}
            </Text>
            <Text style={{ fontWeight: "700", fontSize: 12 }}>{item.time}</Text>
            <Text style={{ fontWeight: "500", fontSize: 14 }}>{item.location}</Text>
          </View>
        </View>
        <View style={{ gap: 65, alignItems: "flex-end" }}>
          <Entypo name="dots-three-vertical" size={24} color="black" />




          {item.timeInfo === "Today" ? <View style={{ flexDirection: "row", alignItems: "center" }}>

            <Entypo name="dot-single" size={24} color="green" />
            <Text style={{ color: "#571FCD", fontWeight: "700", fontSize: 12 }}>LIVE</Text>


          </View> : <Text style={{ color: "#571FCD", fontWeight: "700", fontSize: 12 }}>     {item.timeInfo}</Text>
          }
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <Surface style={styles.container}>

      <View style={{ position: "absolute", bottom: 10, right: 50, zIndex: 1 }}>
        <AntDesign name="pluscircle" size={50} color="#571FCD" />
      </View>
      <View>
        <Text style={{ fontWeight: "700", fontSize: 24, paddingLeft: "5%" }}>
          Timeline
        </Text>
        <View style={{ flexDirection: "row", justifyContent: "center", gap: 20 }}>
          <Text
            onPress={() => setActiveText("Friends")}
            style={[
              styles.headerText,
              activeText === "Friends" ? styles.activeButton : styles.inactiveButton,
            ]}
          >
            Friends
          </Text>
          <Text
            onPress={() => setActiveText("Everyone")}
            style={[
              styles.headerText,
              activeText === "Everyone" ? styles.activeButton : styles.inactiveButton,
            ]}
          >
            Everyone
          </Text>
        </View>
        <View style={styles.borderLine} />
      </View>

      <View style={{ flex: 1, paddingHorizontal: "5%" }}>
        <FlatList
          data={cardData}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
        />
      </View>


    </Surface>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: "13%",
    flex: 1
  },
  card: {
    backgroundColor: "#FAFAFA",
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
