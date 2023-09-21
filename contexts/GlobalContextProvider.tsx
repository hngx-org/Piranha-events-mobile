import {ReactNode} from 'react';
import UserContextProvider from './UserContext';
import EventContextProvider from './EventContext';

//All context providers will be parented by this GlobalContextProvider
export default function GlobalContextProvider(
    {children}: {
        children: ReactNode;
    }
) {

    return (
       <>
        <UserContextProvider>
            <EventContextProvider>
                {children}
            </EventContextProvider>
        </UserContextProvider>
       </>
    )
}