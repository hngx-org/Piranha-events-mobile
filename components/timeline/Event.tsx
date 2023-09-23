import { Surface, Text, Button, TextInput } from "react-native-paper";
import {
  StyleSheet,
  ImageBackground,
  View,
  ScrollView,
  Image,
} from "react-native";
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
import { postRequest } from "../../network/requests";
import { endPoints } from "../../network/api";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { EventContextType } from "../../contexts/EventContext";

let token: any;

const getToken = async () => {
  try {
    const value = await AsyncStorage.getItem("token");
    if (value !== null) {
      console.log(12, value);
      return value.toString();
    }
  } catch (e) {
    console.log(e);
  }
};

// const background = require("../assets/images/background_image.jpg");
// const otherBackground = require("../assets/settings/bgImage.png");
export default function Event({ navigation }: { navigation: any }) {
  const [image, setImage] = useState<any>(null);
  const [imageObj1, setImageObj1] = useState<any>(null);
  const { eventDispatch } = useEventContext() as EventContextType;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [map, setMap] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  // console.log(context?.eventState.events);

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
    navigation.navigate("Timeline", { screen: "Home" });
  };

  const handleEventCreation = async () => {
    const formData = new FormData();

    const requiredInfo = {
      title,
      description,
      location: map,
      start_time: startDate.toISOString(),
      end_time: endDate.toISOString(),
      owner: 1,
      group: 1,
      thumbnail: imageObj1,
    };

    Object.keys(requiredInfo).map((key) => {
      return formData.append(
        key,
        requiredInfo[key as keyof typeof requiredInfo]
      );
    });

    const res = await postRequest(endPoints.events.createEvent, formData, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${getToken().then((data) => data)}`,
    });

    console.log({
      title,
      description,
      location: map,
      start_time: startDate.toISOString(),
      end_time: endDate.toISOString(),
      owner: 1,
      group: 1,
      thumbnail: imageObj1,
    });

    if (res.isSuccess) {
      eventDispatch({
        type: "ADD_NEW_EVENT",
        payload: {
          title,
          description,
          location: map,
          start_time: startDate.toISOString(),
          end_time: endDate.toISOString(),
          owner: 1,
          group: 1,
          image: image,
        },
      });
      handleTimelineNavigation();
    }

    console.log(142, res.result, res.isSuccess);
  };

  // const createFormData = (uri) => {
  //   const fileName = uri.split('/').pop();
  //   const fileType = fileName.split('.').pop();
  //   const formData = new FormData();
  //   formData.append('file', {
  //     uri,
  //     name: fileName,
  //     type: `image/${fileType}`
  //   });

  //   return formData;
  // }

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);

      const fileName = result?.assets[0]?.uri.split("/").pop();
      // uri: result?.assets[0]?.uri,
      const fileType = fileName?.split(".").pop();
      setImageObj1({
        uri: result?.assets[0].uri,
        name: fileName,
        type: `image/${fileType}`,
      });
    }
  };

  // console.log(image?.substring(104));
  console.log(184, imageObj1);

  return (
    <Surface style={styles.container}>
      <ImageBackground
        source={require("../../assets/bgImage.png")}
        resizeMode="cover"
        style={styles.backImage}
      >
        <Surface style={styles.screenBar} elevation={0}>
          <Entypo
            name="chevron-left"
            size={30}
            color="white"
            onPress={handleTimelineNavigation}
          />
          <Text variant="headlineMedium" style={styles.screenTitle}>
            Create Event
          </Text>
        </Surface>
        <ScrollView
          scrollEnabled={true}
          contentContainerStyle={{
            flexGrow: 1,
            gap: 20,
            paddingHorizontal: 20,
            paddingTop: 40,
            paddingBottom: 40,
          }}
        >
          <Button onPress={pickImage} icon="camera">
            Pick Image
          </Button>
          {image && (
            <Image
              source={{ uri: image }}
              style={{ width: 200, height: 200, alignSelf: "center" }}
            />
          )}
          <LargeTextBox
            value={title}
            textBoxHeight={50}
            title="Title"
            placeholder="Type event title here"
            style={styles.textBox}
            onChangeText={setTitle}
          />

          <LargeTextBox
            value={description}
            textBoxHeight={114}
            title="Description"
            placeholder="Type event description here"
            style={styles.textBox}
            onChangeText={setDescription}
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

          <TextInput
            value={map}
            textColor="white"
            placeholderTextColor={"white"}
            onChangeText={setMap}
            placeholder="Add Map"
            style={styles.mapTextInput}
          />

          <Button
            onPress={handleEventCreation}
            rippleColor="#5C3EF8"
            mode="contained"
            style={[
              styles.buttonStyle,
              {
                height: 50,
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
        </ScrollView>
      </ImageBackground>
    </Surface>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    opacity: 0.9,
    paddingTop: 40,
    // paddingHorizontal: 10,
    // gap: 20,
  },

  backImage: {
    flex: 1,
    // paddingTop: 40,
    // paddingHorizontal: 10,
    // gap: 20,
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
    borderBottomWidth: 0.4,
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
    marginHorizontal: 10,
  },

  mapTextInput: {
    height: 50,
    backgroundColor: "#1B1B1B",
  },
});
