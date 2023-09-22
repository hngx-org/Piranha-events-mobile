import { Dispatch, ReactNode, createContext, useReducer } from "react";

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
  | { type: "REMOVE_EVENT"; payload: number };

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

  const [eventState, eventDispatch]  = useReducer(eventReducer, initialState);

  return <EventContext.Provider value={{eventState, eventDispatch}}>{children}</EventContext.Provider>;
}
