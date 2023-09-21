import { useContext } from "react";
import { EventContext } from "../contexts/EventContext";


export default function useEventContext() {
  const context = useContext(EventContext);

  return context;
}
