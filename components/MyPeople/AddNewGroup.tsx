import { Image, ScrollView, StatusBar, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Button, Modal, Portal, Text, TextInput } from "react-native-paper";
import Wrapper from "../Wrapper";
import * as ImagePicker from "expo-image-picker";
import ScreenHeader from "../ScreenHeader";
import { useNavigation } from "@react-navigation/native";
import { appImages } from "../../assets";
import { appColors } from "../../utils/globalStyles";
import { postRequest } from "../../network/requests";
import { endPoints } from "../../network/api";
import { ToastMessage } from "./ToastMessage";
import { UserContext, UserContextProps } from "../../contexts/UserContext";

type RequestResponse = {
  result: any;
  isSuccess: boolean | null;
};

const AddNewGroup = () => {
  const navigation = useNavigation();

  const user = useContext<UserContextProps | null>(UserContext);
  const userInfo = user?.userInfo;

  console.log(userInfo, '++++++++++=')

  const [response, setResponse] = useState<RequestResponse>({ result: null, isSuccess: null });
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastObj, setToastObj] = useState<{ message: string; type: string; text1: string }>({
    message: "",
    type: "",
    text1: "",
  });

  const [newGroupInfo, setNewGroupInfo] = useState({
    name: "",
    description: "",
    inviteMessage: "",
    image: "",
    user: userInfo?.id,
  });

  const onHandleChange = (newValue: string | {name: string, uri: string, token: string, id: Number}, key: string) => {
    console.log(key);
    setNewGroupInfo((prev) => {
      return {
        ...prev,
        [key]: newValue,
      };
    });
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const uriSplit = result?.assets[0]?.uri.split("/");
      console.log(uriSplit);
      const imageObj = {
        name: result?.assets[0]?.uri.split("/")[uriSplit.length - 1],
        uri: result?.assets[0]?.uri,
        type: `${result?.assets[0]?.type}/jpeg`,
      };
      onHandleChange(imageObj, "image");
    }
  };

  const onSendInvite = async () => {
    const formData = new FormData();

    Object.keys(newGroupInfo).map((key) => {
      return formData.append(key, newGroupInfo[key as keyof typeof newGroupInfo]);
    });

    console.log(newGroupInfo.image);
    console.log(formData);

    const res = await postRequest(endPoints.groups.create, formData, {
      "content-type": "multipart/form-data",
      Authorization: `Bearer ${userInfo?.token}`,
    });

    console.log(res?.result, userInfo?.token);
    setResponse(res);
  };

  useEffect(() => {
    if (response.isSuccess !== null && !response.isSuccess) {
      setToastObj({ message: "", type: "error", text1: "Request not successful" });
      setShowToast(true);
    }

    if (response.isSuccess !== null && response.isSuccess) {
      setToastObj({ message: "", type: "success", text1: "Group Created Successfully" });
      setShowToast(true);
      setTimeout(() => {
        navigation.goBack();
      }, 2000);
    }

    if (response?.result !== null) {
      console.log(response);
    }
  }, [response?.isSuccess]);

  return (
    <Wrapper propStyle={{ flex: 1, paddingTop: StatusBar.currentHeight, paddingHorizontal: 29 }}>
      <ScreenHeader title="Create New Group" level={1} onPressOne={navigation.goBack} />

      <ScrollView
        contentContainerStyle={{
          paddingBottom: 50,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.formWrapper}>
          <TouchableOpacity onPress={() => pickImage()} style={styles.imageWrapper}>
            <Image
              source={
                newGroupInfo?.image?.length === 0 ? appImages.defaultGroupImage : { uri: newGroupInfo.image?.uri }
              }
              style={{
                width: 150,
                height: 150,
              }}
            />

            {newGroupInfo?.image?.length === 0 ? (
              <Text variant="bodyMedium" style={styles.imagePlaceholder}>
                Add group photo
              </Text>
            ) : null}
          </TouchableOpacity>

          <View style={styles.fieldWrapper}>
            <Text variant="bodyMedium" style={styles.label}>
              Group name
            </Text>

            <TextInput
              value={newGroupInfo.name}
              textColor={appColors.placeholder}
              placeholder="Type group name here"
              placeholderTextColor={appColors.placeholder}
              onChangeText={(e) => onHandleChange(e, "name")}
              style={styles.textInput}
            />
          </View>

          <View style={styles.fieldWrapper}>
            <Text variant="bodyMedium" style={styles.label}>
              Group description
            </Text>

            <TextInput
              value={newGroupInfo.description}
              textColor={appColors.placeholder}
              placeholder="Type event description here"
              placeholderTextColor={appColors.placeholder}
              onChangeText={(e) => onHandleChange(e, "description")}
              style={[styles.textInput, styles.descInput]}
            />
          </View>

          <View style={styles.fieldWrapper}>
            <Text variant="bodyMedium" style={styles.label}>
              Add invite message
            </Text>

            <TextInput
              textColor={appColors.placeholder}
              value={newGroupInfo.inviteMessage}
              placeholder="Type invite message  here"
              placeholderTextColor={appColors.placeholder}
              onChangeText={(e) => onHandleChange(e, "inviteMessage")}
              style={styles.textInput}
            />
          </View>
        </View>

        <Button mode="contained" onPress={() => onSendInvite()} style={styles.submitButton}>
          Create group
        </Button>
      </ScrollView>

      {showToast ? <ToastMessage showToast={showToast} setShowToast={setShowToast} toastObj={toastObj} /> : null}
    </Wrapper>
  );
};


export default AddNewGroup;

const styles = StyleSheet.create({
  containerStyle: {
    width: "100%",
    height: 500,
    backgroundColor: "white",
  },
  formWrapper: {
    width: "100%",
    alignItems: "center",
  },
  imagePlaceholder: {
    position: "absolute",
    zIndex: 10,
    color: appColors.white,
    fontWeight: "700",
  },
  label: {
    color: appColors.white,
    fontWeight: "600",
    fontSize: 18,
    marginBottom: 10,
  },
  fieldWrapper: {
    width: "100%",
    justifyContent: "flex-start",
    marginBottom: 50,
  },
  imageWrapper: {
    marginBottom: 36,
    justifyContent: "center",
    alignItems: "center",
  },
  textInput: {
    backgroundColor: appColors.greyBlack,
    color: appColors.placeholder,
    borderWidth: 0,
  },
  descInput: {
    height: 200,
  },
  submitButton: {
    backgroundColor: appColors.purple,
    borderRadius: 5,
    paddingVertical: 8,
  },
});
