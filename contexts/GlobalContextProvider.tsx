import { ReactNode } from "react";
import UserContextProvider from "./UserContext";
import EventContextProvider from "./EventContext";
import { ClerkProvider } from "@clerk/clerk-expo";

//All context providers will be parented by this GlobalContextProvider
export default function GlobalContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <UserContextProvider>
        <ClerkProvider publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY as string}>
          <EventContextProvider>{children}</EventContextProvider>
        </ClerkProvider>
      </UserContextProvider>
    </>
  );
}
