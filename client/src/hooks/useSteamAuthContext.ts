import { SteamAuthContext } from "../context/SteamAuthContext";
import { useContext } from "react";

type SteamAuthContextType = {
  steamUser: any; 
  dispatch: React.Dispatch<any>;
};

export const useSteamAuthContext = (): SteamAuthContextType => {
  const context = useContext(SteamAuthContext);

  if (!context) {
    throw new Error('SteamAuthContext nie istnieje');
  }

  return context;
};
