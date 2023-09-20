import { Surface, Text, Button } from "react-native-paper";
import { StyleSheet, ImageBackground, View } from "react-native";
import LargeTextBox from "../components/LargeTextBox";
import { useState } from "react";
import {
  DateTimePickerAndroid,
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { months } from "../libs/dateHandler";
import { Ionicons } from "@expo/vector-icons";

const background = require("../assets/images/background_image.jpg");
export default function Event() {
  const [date, setDate] = useState(new Date());

  const onChange = (
    event: DateTimePickerEvent,
    selectedDate: Date | undefined
  ) => {
    const currentDate = selectedDate;
    setDate(currentDate!);
  };

  const showMode = (currentMode: any) => {
    DateTimePickerAndroid.open({
      value: date,
      onChange: onChange,
      mode: currentMode,
      is24Hour: true,
    });
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  return (
    <Surface style={styles.container}>
      <ImageBackground
        source={background}
        resizeMode="cover"
        style={styles.backImage}
      >
        <View style={styles.overlay} />
        <Text variant="headlineMedium" style={styles.screenTitle}>
          Create Event
        </Text>

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
              onPress={showDatepicker}
              mode="contained"
              style={styles.buttonStyle}
              theme={{ roundness: 3 }}
              contentStyle={{
                flexDirection: "row-reverse",
                alignItems: "center",
              }}
            >
              {`${date.getUTCDate()} ${
                months[date.getMonth()]
              } ${date.getUTCFullYear()}`}
              {/* <Ionicons name="chevron-down-sharp" size={24} color="white" /> */}
            </Button>
            <Button
              icon="chevron-down"
              onPress={showTimepicker}
              mode="contained"
              style={styles.buttonStyle}
              theme={{ roundness: 3 }}
              contentStyle={{
                flexDirection: "row-reverse",
                alignItems: "center",
              }}
            >
              {`${date.getUTCHours()}:${date.getUTCMinutes()}PM`}
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
              onPress={showDatepicker}
              mode="contained"
              style={styles.buttonStyle}
              theme={{ roundness: 3 }}
              contentStyle={{
                flexDirection: "row-reverse",
                alignItems: "center",
              }}
            >
              {`${date.getUTCDate()} ${
                months[date.getMonth()]
              } ${date.getUTCFullYear()}`}
            </Button>
            <Button
              icon="chevron-down"
              onPress={showTimepicker}
              mode="contained"
              style={styles.buttonStyle}
              theme={{ roundness: 3 }}
              contentStyle={{
                flexDirection: "row-reverse",
                alignItems: "center",
              }}
            >
              {`${date.getUTCHours()}:${date.getUTCMinutes()}PM`}
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
          <Ionicons name="location" size={24} />
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
    background: "black",
  },

  backImage: {
    flex: 1,
    background: "orange",
    paddingTop: 40,
    paddingHorizontal: 10,
    gap: 20,
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#0F0F0F",
    opacity: 0.8,
    pointerEvents: "none",
  },

  screenTitle: {
    fontSize: 22,
    textAlign: "center",
    color: "white",
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
});
