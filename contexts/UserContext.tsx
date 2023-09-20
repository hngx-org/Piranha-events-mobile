import React, { createContext, useState, ReactNode, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Google from "expo-auth-session/providers/google";
import { AuthSessionResult } from "expo-auth-session";

export interface UserContextProps {
  userInfo: any | null;
  promptAsync: () => Promise<AuthSessionResult>;
}

interface UserContextProviderProps {
  children: ReactNode;
}

export const UserContext = createContext<UserContextProps | undefined>(
  undefined
);

const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState<string>();
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      "220172640798-9u59ftrn6nqf0qdtadp33q5a40o9j737.apps.googleusercontent.com",
    expoClientId:
      "220172640798-bgk84fv7qtcf7krh608n4vu0hal1kgn4.apps.googleusercontent.com",
  });

  useEffect(() => {
    handleSignInWithGoogle();
  }, [response]);

  const handleSignInWithGoogle = async () => {
    try {
      const user = await AsyncStorage.getItem("@user");
      if (!user) {
        if (response?.type === "success") {
          await getUserInfo(response?.authentication?.accessToken);
        }
      } else {
        const parsedUser = JSON.parse(user);
        setUserInfo(parsedUser);
      }
    } catch (error) {
      // Handle AsyncStorage read error or JSON parsing error
      console.error("Error reading or parsing user data:", error);
    }
  };

  const getUserInfo = async (token: string | undefined) => {
    if (!token) return;
    try {
      const response = await fetch("https://www.googleapis.com/oauth2/v2/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const user = await response.json();
      await AsyncStorage.setItem("@user", JSON.stringify(user));
      setUserInfo(user);
    } catch (error: unknown) {
      console.log(error);
      setError("Something went wrong");
    }
  };
  const value = { userInfo, promptAsync };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserContextProvider;
