import axios from "axios";
import { Dispatch, ReactNode, createContext, useEffect, useReducer } from "react";

//This type is subject to change
export interface IEvent {
  id: number;
  title: string;
  description: string;
  startDate: Date;
  startTime: string;
  endDate: Date;
  endTime: string;
  location: string;
  group: string;
  image?: string;
}

export interface IEventProp {
  events: IEvent[];
}

type EventAction =
  | { type: "ADD_NEW_EVENT"; payload: IEvent }
  | { type: "REMOVE_EVENT"; payload: number }
  | { type: "FETCH_ALL_EVENTS"; payload: IEvent[] };

const initialEventState: IEvent = {
  id: 0,
  title: "",
  description: "",
  startDate: new Date(),
  startTime: `${new Date().getUTCHours()} : ${new Date().getUTCMinutes()}`,
  endDate: new Date(),
  endTime: `${new Date().getUTCHours()} : ${new Date().getUTCMinutes()}`,
  location: "",
  group: "",
};

const initialState: IEventProp = {
  events: []

};

const eventReducer = (state: IEventProp, action: EventAction) => {
  switch (action.type) {
    case "ADD_NEW_EVENT":
      return {
        ...state,
        events: [...state.events, action.payload],
      };

    case "REMOVE_EVENT":
      return {
        ...state,
        events: state.events.filter(
          (event: IEvent) => event.id !== action.payload
        ),
      };

    case 'FETCH_ALL_EVENTS':
      return {
        ...state,
        events: action.payload, // Replace existing events with fetched events
      };



    default:
      return state;
  }
};

export const EventContext = createContext<{
  eventState: IEventProp,
  eventDispatch: Dispatch<EventAction>
} | null>(null);

export default function EventContextProvider({
  children,
}: {
  children: ReactNode;
}) {

  const [eventState, eventDispatch] = useReducer(eventReducer, initialState);

  // Function to fetch all events from the API






  return <EventContext.Provider value={{ eventState, eventDispatch }}>{children}</EventContext.Provider>;
}
