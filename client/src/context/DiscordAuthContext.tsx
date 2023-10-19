import { createContext, useReducer, useEffect, ReactNode } from "react"
import Cookie from 'js-cookie'

type DiscordAuthAction = { type: 'LOGIN'; payload: any } | { type: 'LOGOUT' };
type DiscordAuthState = { discordUser: any };

export const DiscordAuthContext = createContext<{ discordUser: any; dispatch: React.Dispatch<DiscordAuthAction> } | undefined>(undefined);

export const discordAuthReducer = (state: DiscordAuthState, action: DiscordAuthAction): DiscordAuthState => {
    switch (action.type) {
        case 'LOGIN':
            return { discordUser: action.payload };
        case 'LOGOUT':
            return { discordUser: null };
        default:
            return state;
    }
};

export const DiscordAuthContextProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(discordAuthReducer, {
        discordUser: null
    });

    useEffect(() => {
        const discordUser = Cookie.get('discordToken')
        if (discordUser) {
            dispatch({ type: 'LOGIN', payload: discordUser });
        }
    }, []);

    return (
        <DiscordAuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </DiscordAuthContext.Provider>
    );
};