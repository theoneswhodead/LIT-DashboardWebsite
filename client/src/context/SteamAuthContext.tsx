import { createContext, useReducer, useEffect, ReactNode } from "react"
import Cookie from 'js-cookie'

type SteamAuthAction = { type: 'LOGIN'; payload: any } | { type: 'LOGOUT' };
type SteamAuthState = { steamUser: any };

export const SteamAuthContext = createContext<{ steamUser: any; dispatch: React.Dispatch<SteamAuthAction> } | undefined>(undefined);

export const steamAuthReducer = (state: SteamAuthState, action: SteamAuthAction): SteamAuthState => {
    switch (action.type) {
        case 'LOGIN':
            return { steamUser: action.payload };
        case 'LOGOUT':
            return { steamUser: null };
        default:
            return state;
    }
};

export const SteamAuthContextProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(steamAuthReducer, {
        steamUser: null
    });

    useEffect(() => {
        const steamUser = Cookie.get('steamToken')
        if (steamUser) {
            dispatch({ type: 'LOGIN', payload: steamUser });
        }
    }, []);

    return (
        <SteamAuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </SteamAuthContext.Provider>
    );
};