import { ReactNode } from "react";
import UserContextProvider from "./UserContext";
import EventContextProvider from "./EventContext";
import { ClerkProvider } from "@clerk/clerk-expo";
import * as SecureStore from "expo-secure-store";

export const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

//All context providers will be parented by this GlobalContextProvider
export default function GlobalContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <ClerkProvider
        tokenCache={tokenCache}
        publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY as string}
      >
        <EventContextProvider>{children}</EventContextProvider>
      </ClerkProvider>
    </>
  );
}
