import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import React, { useContext, useEffect } from "react";
import { UserContext, UserContextProps } from "../contexts/UserContext";
import { StatusBar } from "expo-status-bar";

const SignIn = ({ navigation }: any) => {
  const { userInfo, promptAsync } = useContext(UserContext) as UserContextProps;
  useEffect(() => {
    // Check if userInfo exists in local storage
    if (userInfo) {
      // User is already logged in, navigate to the Home screen
      navigation.navigate("Home");
    }
  }, [userInfo, navigation]);
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require("../assets/bg.png")}
        resizeMode="stretch"
        style={styles.bgImage}
      >
        <StatusBar style="light" />
        <View style={styles.imageContainer}>
          <Image
            source={require("../assets/sign-in-img.png")}
            style={styles.image}
          />
        </View>
        <Text style={styles.welcomeText}>Welcome on board!</Text>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => promptAsync()}
        >
          <Image source={require("../assets/google.png")} style={styles.icon} />
          <Text style={styles.buttonText}>Sign in with Google</Text>
        </TouchableOpacity>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#0F0F0F",
  },
  bgImage: {
    flex: 1,
    paddingHorizontal: 26,
    alignItems: "center",
  },
  imageContainer: {
    width: Dimensions.get("window").width,
    alignItems: "center",
  },
  image: {
    width: "100%",
    resizeMode: "cover",
  },
  welcomeText: {
    fontSize: 26,
    textAlign: "center",
    margin: 30,
    color: "#fff",
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    paddingHorizontal: 20,
    backgroundColor: "#007AFF",
    borderRadius: 8,
    height: 50,
    justifyContent: "center",
    width: 300,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
    tintColor: "#fff",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});
