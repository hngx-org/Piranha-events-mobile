import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  ImageBackground,
} from "react-native";
import {
  ProfileHighlight,
  ScreenHeader,
  SettingsOptions,
} from "../components/settings";
import { colors } from "../utils/styles";
import AppScreen from "../components/AppScreen";

export default function Settings() {
  return (
    <AppScreen>
      <ImageBackground
        source={require("../assets/settings/bgImage.png")}
        resizeMode="stretch"
        style={styles.image}
      >
        <ScreenHeader />

        <ProfileHighlight />

        <SettingsOptions />
      </ImageBackground>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colors.dark,
  },

  container: { flex: 1 },

  image: { flex: 1, paddingHorizontal: 26 },
});
