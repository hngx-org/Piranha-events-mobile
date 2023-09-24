import { useContext } from "react";
import { NavigationContainer, NavigationProp } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/Home";
import AddNewGroup from "./components/MyPeople/AddNewGroup";
import InsideGroup from "./components/MyPeople/InsideGroup";
import React from "react";
import { SignedIn, SignedOut } from "@clerk/clerk-expo";
import SignInWithGoogle from "./screens/SignInWithGoogle";
import Comments from "./screens/Comments";

export type StackParamsList1 = {
  Home: undefined;
  InsideGroup: undefined;
  AddNewGroup: undefined;
  Comments: undefined;
  SignInWithGoogle?: undefined;
};

export type StackNavigationType = NavigationProp<StackParamsList1>;
const Stack = createNativeStackNavigator<StackParamsList1>();

export default function AuthScreen() {
  return (
    <NavigationContainer>
      <SignedIn>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="InsideGroup" component={InsideGroup} />
          <Stack.Screen name="AddNewGroup" component={AddNewGroup} />
          <Stack.Screen name="Comments" component={Comments} />
        </Stack.Navigator>
      </SignedIn>
      <SignedOut>
        <Stack.Navigator
          initialRouteName="SignInWithGoogle"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="SignInWithGoogle" component={SignInWithGoogle} />
        </Stack.Navigator>
      </SignedOut>
    </NavigationContainer>
  );
}
