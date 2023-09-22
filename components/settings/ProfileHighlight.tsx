import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Avatar } from "react-native-paper";
import { colors } from "../../utils/styles";
import { useUser } from "@clerk/clerk-expo";

const ProfileHighlight = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  if (!isLoaded || !isSignedIn) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Avatar.Image
        size={116}
        source={{
          uri: user.imageUrl,
        }}
      />

      <Text style={styles.userName}>{user.fullName}</Text>
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
