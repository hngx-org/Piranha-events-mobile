import { useContext } from "react";
import { NavigationContainer, NavigationProp } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/Home";
import AddNewGroup from "./components/MyPeople/AddNewGroup";
import InsideGroup from "./components/MyPeople/InsideGroup";
import { UserContext, UserContextProps } from "./contexts/UserContext";
import SignIn from "./screens/SignIn";
import React from "react";
import { SignedIn, SignedOut } from "@clerk/clerk-expo";
import SignIn2 from "./screens/SignIn2";

export type StackParamsList1 = {
  Home: undefined;
  InsideGroup: undefined;
  AddNewGroup: undefined;
  SignIn2?: undefined;
};

export type StackNavigationType = NavigationProp<StackParamsList1>;
const Stack = createNativeStackNavigator<StackParamsList1>();

export default function AuthScreen() {
  const { userInfo } = useContext(UserContext) as UserContextProps;

  console.log({ userInfo });

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
        </Stack.Navigator>
      </SignedIn>
      <SignedOut>
        <Stack.Navigator
          initialRouteName="SignIn2"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="SignIn2" component={SignIn2} />
        </Stack.Navigator>
      </SignedOut>
    </NavigationContainer>
  );
}
