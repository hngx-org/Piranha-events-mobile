import { StyleSheet, View, ViewStyle } from "react-native";
import React from "react";
import { Text } from "react-native-paper";
import { appColors } from "../utils/globalStyles";

const ScreenHeader = ({ title, containerStyle }: { title: string; containerStyle: ViewStyle }) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={{ color: appColors.white }}>{title}</Text>
    </View>
  );
};

export default ScreenHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginBottom: 69,
  },
});
