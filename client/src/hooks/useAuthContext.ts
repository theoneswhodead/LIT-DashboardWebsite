import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

type AuthContextType = {
  user: any; 
  dispatch: React.Dispatch<any>;
};

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('AuthContext nie istnieje');
  }

  return context;
};
