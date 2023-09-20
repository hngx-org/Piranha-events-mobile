import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Avatar } from "react-native-paper";
import { colors } from "../../utils/styles";

const ProfileHighlight = () => {
  return (
    <View style={styles.container}>
      <Avatar.Image
        size={116}
        source={require("../../assets/settings/avatar.png")}
      />

      <Text style={styles.userName}>Victoria</Text>
    </View>
  );
};

export default ProfileHighlight;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 25,
  },

  userName: {
    textAlign: "center",
    color: colors.white,
    fontWeight: "600",
    lineHeight: 32,
    fontSize: 18,
  },
});
