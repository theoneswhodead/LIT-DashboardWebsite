import { DiscordAuthContext } from "../context/DiscordAuthContext";
import { useContext } from "react";

type DiscordAuthContextType = {
  discordUser: any; 
  dispatch: React.Dispatch<any>;
};

export const useDiscordAuthContext = (): DiscordAuthContextType => {
  const context = useContext(DiscordAuthContext);

  if (!context) {
    throw new Error('DiscordAuthContext nie istnieje');
  }

  return context;
};
