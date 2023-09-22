import React from "react";
import * as WebBrowser from "expo-web-browser";
import {
  Button,
  Dimensions,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Image,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useOAuth } from "@clerk/clerk-expo";
import { useWarmUpBrowser } from "../hooks/warmUpBrowser";
WebBrowser.maybeCompleteAuthSession();

const SignInWithGoogle = () => {
  // Warm up the android browser to improve UX
  useWarmUpBrowser();
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();

      if (createdSessionId) {
        setActive?.({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);

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
        <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
          <Image source={require("../assets/google.png")} style={styles.icon} />
          <Text style={styles.buttonText}>Sign in with Google</Text>
        </TouchableOpacity>
      </ImageBackground>
    </SafeAreaView>
  );
};
export default SignInWithGoogle;

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
