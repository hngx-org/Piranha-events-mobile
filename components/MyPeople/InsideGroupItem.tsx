import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { Button, Text } from "react-native-paper";
import { appColors } from "../../utils/globalStyles";
import { useNavigation } from "@react-navigation/native";
import { appImages } from "../../assets";

const InsideGroupItem = ({ group, index }: { group: any; index: number }) => {
  const navigation = useNavigation();

  const commenters = ["", ""];

  return (
    <View style={[styles.container, { marginRight: index % 2 === 0 ? "4%" : 0 }]}>
      <View style={styles.top}>
        <Image
          source={appImages.footBall}
          style={{
            width: 50,
            height: 50,
          }}
          resizeMode="contain"
        />

        <Text variant="bodySmall" style={{ fontWeight: "800", fontSize: 13, color: appColors.purple }}>
          Football Game
        </Text>

        <Text
          variant="bodySmall"
          style={{
            fontWeight: "800",
            fontSize: 10,
            paddingVertical: 10,
            paddingHorizontal: 15,
            borderRadius: 10,
            borderWidth: 1,
            color: "white",
            borderColor: appColors.purple,
          }}
        >
          May 20, 2023
        </Text>
      </View>

      <View
        style={{
          marginBottom: 15,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          <Image
            source={appImages.location}
            style={{
              width: 15,
              height: 15,
              marginRight: 7,
            }}
            resizeMode="contain"
          />
          <Text variant="bodySmall" style={{ fontWeight: "800", fontSize: 13, color: appColors.white }}>
            Teslim Balogun Stadium
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Image
            source={appImages.clock}
            style={{
              width: 12,
              height: 12,
              marginRight: 7,
            }}
            resizeMode="contain"
          />
          <Text variant="bodySmall" style={{ fontWeight: "800", fontSize: 13, color: appColors.white }}>
            4 - 6 PM
          </Text>
        </View>
      </View>

      <Button
        onPress={() => navigation.navigate("InsideGroup", {})}
        buttonColor={appColors.purple}
        style={{
          paddingVertical: 6,
          borderRadius: 15,
        }}
      >
        <Text variant="bodySmall" style={{ fontWeight: "200", fontSize: 13, color: appColors.white }}>
          Yes, I will Attend
        </Text>
      </Button>

      <View
        style={{
          width: "100%",
          height: 1,
          backgroundColor: appColors.purple,
          marginVertical: 10,
        }}
      />

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginVertical: 5,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              position: "relative",
              width: "25%",
              height: 30,
              alignItems: "center",
              justifyContent: "flex-start",
              marginRight: 15,
            }}
          >
            {commenters.map((commenter, index) => (
              <Image
                source={appImages.myPeople}
                style={{
                  width: 30,
                  height: 30,
                  position: "absolute",
                  marginLeft: index * 20,
                  borderRadius: 50,
                }}
              />
            ))}
          </View>

          <Text variant="bodySmall" style={{ color: appColors.white }}>
            11 Comments
          </Text>
        </View>

        <View
          style={{
            justifyContent: "center",
          }}
        >
          <Image
            source={appImages.commentArrow}
            style={{
              width: 10,
              height: 10,
            }}
            resizeMode="contain"
          />
        </View>
      </View>
    </View>
  );
};

export default InsideGroupItem;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 7,
    backgroundColor: appColors.greyBlack,
    marginBottom: 28,
    borderRadius: 15,
  },
  top: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 10,
  },
  groupName: {
    width: "100%",
    fontWeight: "800",
    color: "white",
    textAlign: "center",
  },
  info: {
    width: "100%",
    textAlign: "center",
    fontWeight: "800",
    color: appColors.red,
  },
});
