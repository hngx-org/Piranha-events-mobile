import { ScrollView, StyleSheet, Text, View, ViewStyle } from "react-native";
import React from "react";

const EmptyList = ({ wrapperStyle, isRow }: { wrapperStyle: ViewStyle; isRow: boolean }) => {
  return (
    <ScrollView>
      {["", "", "", ""].map((_, i) => (
        <View
          style={{
            width: "100%",
          }}
        ></View>
      ))}
    </ScrollView>
  );
};

export default EmptyList;

const styles = StyleSheet.create({});
