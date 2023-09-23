import { ScrollView, StyleSheet, Text, View, ViewStyle } from "react-native";
import React from "react";
import { appColors } from "../../utils/globalStyles";

const EmptyList = ({
  wrapperStyle,
  isLoading,
  emptyMesage,
  isRow,
}: {
  wrapperStyle?: ViewStyle;
  isLoading: boolean;
  emptyMesage: string;
  isRow?: boolean;
}) => {
  return (
    <ScrollView>
      {isLoading
        ? ["", "", "", ""].map((_, i) => (
            <View
              style={{
                width: i % 2 === 0 ? "60%" : "60%",
                height: 40,
                alignSelf: i % 2 === 0 ? "flex-end" : "flex-start",
                backgroundColor: appColors.greyBlack,
                marginBottom: 30,
              }}
            ></View>
          ))
        : null}

      <Text style={{ color: appColors.placeholder, width: "100%", textAlign: "center" }}>
        {isLoading ? "Loading..." : emptyMesage}
      </Text>
    </ScrollView>
  );
};

export default EmptyList;

const styles = StyleSheet.create({});
