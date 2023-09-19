import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import ScreenHeader from "../component/ScreenHeader";

const MyPeople = () => {
  return (
    <SafeAreaView>
      <>
        <ScreenHeader title="My People" />


        <Text>MyPeople</Text>
      </>
    </SafeAreaView>
  );
};

export default MyPeople;

const styles = StyleSheet.create({});
