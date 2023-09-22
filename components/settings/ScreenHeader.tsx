import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import { colors } from "../../utils/styles";

const ScreenHeader = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      <TouchableOpacity>
        <Feather name="more-vertical" size={24} color={colors.white} />
      </TouchableOpacity>
    </View>
  );
};

export default ScreenHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 16,
  },

  title: {
    color: colors.white,
    fontSize: 22,
    fontWeight: "700",
  },
});
