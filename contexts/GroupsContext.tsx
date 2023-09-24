import React, {
  createContext,
  useState,
  ReactNode,
  useEffect,
  useContext,
} from "react";
import { getRequest } from "../network/requests";
import { endPoints } from "../network/api";
import { useUserContext } from "./UserContext";

export interface Group {
  id: number;
  members_count: number;
  event_counts: number;
  name: string;
  image: string;
  permissions?: any;
  members: any;
}

export interface GroupContextProps {
  groups: Group[];
  isLoading: boolean;
  setGroups: React.Dispatch<React.SetStateAction<Group[]>>;
  getGroups: () => any;
  response: {
    isSuccess: boolean | null;
    result: any;
  };
  setResponse: any;
}

interface GroupContextProviderProps {
  children: ReactNode;
}

export const GroupContext = createContext<GroupContextProps | null>(null);

export const useGroupContext = () =>
  useContext(GroupContext) as GroupContextProps;

const GroupContextProvider = ({ children }: GroupContextProviderProps) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [groups, setGroups] = useState<Group[]>([]);
  const [response, setResponse] = useState<{
    isSuccess: boolean | null;
    result: any;
  }>({
    isSuccess: null,
    result: null,
  });
  const user = useUserContext();
  const userInfo = user?.userInfo;
  const getGroups = async () => {
    setIsLoading(true);
    const res = await getRequest(endPoints.groups.getForUser(userInfo?.id), {
      Authorization: `Bearer ${userInfo?.token}`,
    });

    console.log(res?.result);

    setResponse(res);
  };

  const value = {
    getGroups,
    groups,
    isLoading,
    setGroups,
    response,
    setResponse,
  };

  return (
    <GroupContext.Provider value={value}>{children}</GroupContext.Provider>
  );
};

export default GroupContextProvider;
