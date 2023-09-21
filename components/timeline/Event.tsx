import { Surface, Text, Button } from "react-native-paper";
import { StyleSheet, ImageBackground, View } from "react-native";
import LargeTextBox from "../LargeTextBox";
import { useState } from "react";
import {
  DateTimePickerAndroid,
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { months } from "../../libs/dateHandler";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import useEventContext from "../../hooks/useEventContext";
// import Wrapper from "../components/Wrapper";

// const background = require("../assets/images/background_image.jpg");
// const otherBackground = require("../assets/settings/bgImage.png");
export default function Event({navigation}: {navigation: any}) {
  const context = useEventContext();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  console.log(context?.eventState.events);
  const startOnChange = (
    event: DateTimePickerEvent,
    selectedDate: Date | undefined
  ) => {
    const currentDate = selectedDate;
    setStartDate(currentDate!);
  };

  const startShowMode = (currentMode: any) => {
    DateTimePickerAndroid.open({
      value: startDate,
      onChange: startOnChange,
      mode: currentMode,
      is24Hour: true,
    });
  };

  const showDatepicker1 = () => {
    startShowMode("date");
  };

  const showTimepicker1 = () => {
    startShowMode("time");
  };

  const endOnChange = (
    event: DateTimePickerEvent,
    selectedDate: Date | undefined
  ) => {
    const currentDate = selectedDate;
    setEndDate(currentDate!);
  };

  const endShowMode = (currentMode: any) => {
    DateTimePickerAndroid.open({
      value: endDate,
      onChange: endOnChange,
      mode: currentMode,
      is24Hour: true,
    });
  };

  const showDatepicker2 = () => {
    endShowMode("date");
  };

  const showTimepicker2 = () => {
    endShowMode("time");
  };

  const handleTimelineNavigation = () => {
      
    navigation.navigate('Timeline', {screen: "Home"});
      
  }

  return (
    <Surface style={styles.container}>
      <ImageBackground
        source={require("../../assets/bgImage.png")}
        resizeMode="cover"
        style={styles.backImage}
      >
        {/* <View style={styles.overlay} /> */}

        <Surface style={styles.screenBar} elevation={0}>
          <Entypo name="chevron-left" size={30} color="white" onPress={handleTimelineNavigation}/>
          <Text variant="headlineMedium" style={styles.screenTitle}>
            Create Event
          </Text>
        </Surface>

        <LargeTextBox
          title="Description"
          placeholder="Type event description here"
          style={styles.textBox}
        />

        <Text style={[styles.title, styles.underlined]}>Time Duration</Text>

        <Surface
          style={[styles.rowContainer, styles.underlined, { height: 61 }]}
          elevation={0}
        >
          <Text style={[styles.title, { flex: 1 }]}>Starts</Text>
          <Surface style={[styles.rowContainer, { flex: 3, gap: 2 }]}>
            <Button
              icon="chevron-down"
              onPress={showDatepicker1}
              mode="contained"
              style={styles.buttonStyle}
              theme={{ roundness: 3 }}
              contentStyle={{
                flexDirection: "row-reverse",
                alignItems: "center",
              }}
            >
              {`${startDate.getUTCDate()} ${
                months[startDate.getMonth()]
              } ${startDate.getUTCFullYear()}`}
              {/* <Ionicons name="chevron-down-sharp" size={24} color="white" /> */}
            </Button>
            <Button
              icon="chevron-down"
              onPress={showTimepicker1}
              mode="contained"
              style={styles.buttonStyle}
              theme={{ roundness: 3 }}
              contentStyle={{
                flexDirection: "row-reverse",
                alignItems: "center",
              }}
            >
              {`${startDate.getUTCHours()}:${startDate.getUTCMinutes()}PM`}
            </Button>
          </Surface>
        </Surface>

        <Surface
          style={[styles.rowContainer, styles.underlined, { height: 61 }]}
          elevation={0}
        >
          <Text style={[styles.title, { flex: 1 }]}>Ends</Text>
          <Surface style={[styles.rowContainer, { flex: 3, gap: 2 }]}>
            <Button
              icon="chevron-down"
              onPress={showDatepicker2}
              mode="contained"
              style={styles.buttonStyle}
              theme={{ roundness: 3 }}
              contentStyle={{
                flexDirection: "row-reverse",
                alignItems: "center",
              }}
            >
              {`${endDate.getUTCDate()} ${
                months[endDate.getMonth()]
              } ${endDate.getUTCFullYear()}`}
            </Button>
            <Button
              icon="chevron-down"
              onPress={showTimepicker2}
              mode="contained"
              style={styles.buttonStyle}
              theme={{ roundness: 3 }}
              contentStyle={{
                flexDirection: "row-reverse",
                alignItems: "center",
              }}
            >
              {`${endDate.getUTCHours()}:${endDate.getUTCMinutes()}PM`}
            </Button>
          </Surface>
        </Surface>

        <Surface
          style={[
            styles.rowContainer,
            { justifyContent: "flex-start", gap: 4 },
          ]}
          elevation={0}
        >
          <Text style={styles.title}>Location</Text>
          <Ionicons name="location" size={24} color="#5C3EC8" />
        </Surface>

        <Button
          icon="chevron-right"
          mode="contained"
          style={[styles.buttonStyle, { width: 180, height: 60 }]}
          theme={{ roundness: 3 }}
          contentStyle={{ flexDirection: "row-reverse", alignItems: "center" }}
        >
          Choose on Map
        </Button>

        <Button
          rippleColor="green"
          mode="contained"
          style={[
            styles.buttonStyle,
            {
              height: 60,
              backgroundColor: "#5C3EC8",
              justifyContent: "center",
              borderRadius: 5,
              marginTop: 30,
            },
          ]}
          theme={{ roundness: 0 }}
        >
          Create event
        </Button>
      </ImageBackground>
    </Surface>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    opacity: 0.9,
    // paddingTop: 40,
    // paddingHorizontal: 10,
    // gap: 20,
  },

  backImage: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 10,
    gap: 20,
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#0F0F0F",
    opacity: 0.7,
    pointerEvents: "none",
  },

  screenTitle: {
    fontSize: 22,
    textAlign: "center",
    color: "white",
    flex: 1,
  },

  textBox: {
    backgroundColor: "transparent",
    gap: 10,
  },

  title: {
    color: "white",
    fontSize: 18,
    borderRadius: 0,
  },

  underlined: {
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: "white",
  },

  rowContainer: {
    flexDirection: "row",
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "space-between",
  },

  buttonStyle: {
    backgroundColor: "#1B1B1B",
    color: "white",
    flexDirection: "row",
    alignItems: "center",
    height: 50,
  },

  screenBar: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
});
