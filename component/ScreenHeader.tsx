import { StyleSheet, View } from "react-native";
import React from "react";
import { Text } from "react-native-paper";

const ScreenHeader = ({ title }: { title: string }) => {
  return (
    <View style={styles.container}>
      <Text>{title}</Text>
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
