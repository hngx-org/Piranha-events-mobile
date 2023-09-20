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

export default function Settings() {
  return (
    <SafeAreaView style={[styles.wrapper]}>
      <ImageBackground
        source={require("../assets/settings/bgImage.png")}
        resizeMode="stretch"
        style={styles.image}
      >
        <StatusBar backgroundColor={colors.dark} />

        <ScreenHeader />

        <ProfileHighlight />

        <SettingsOptions />
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colors.dark,
  },

  container: { flex: 1 },

  image: { flex: 1, paddingHorizontal: 29 },
});
