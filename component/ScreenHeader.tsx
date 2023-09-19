import { StyleSheet, Text, View } from "react-native";
import React from "react";

const ScreenHeader = ({ title }: { title: string }) => {
  return (
    <View
      style={{
        flexDirection: "row",
      }}
    >
      <Text>{title}</Text>
    </View>
  );
};

export default ScreenHeader;

const styles = StyleSheet.create({});
