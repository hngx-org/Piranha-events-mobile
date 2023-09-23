import React, { createContext, useState, ReactNode, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Google from "expo-auth-session/providers/google";
import { AuthSessionResult } from "expo-auth-session";
import { useUser } from "@clerk/clerk-expo";
import { postRequest } from "../network/requests";
import { endPoints } from "../network/api";

export interface UserContextProps {
  user: any | null;
  userInfo: any | null
}

interface UserContextProviderProps {
  children: ReactNode;
}

export const UserContext = createContext<UserContextProps | null>(null);

export const useUserContext = () => useContext(UserContext) as UserContextProps;

const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const { isLoaded, isSignedIn, user } = useUser();

  const [userInfo, setUserInfo] = useState();

  if (!isLoaded || !isSignedIn) {
    return null;
  }

  const GetUser = async () => {
    const res = await postRequest(endPoints.auth.login, {
      email: user?.emailAddresses[0].emailAddress,
      pass_id: user?.id,
    });

    setUserInfo(res?.result?.data.data);
  };

  useEffect(() => {
    if(!userInfo?.id){
      GetUser();
    }
  }, []);

  const value = { user, GetUser, userInfo };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserContextProvider;
