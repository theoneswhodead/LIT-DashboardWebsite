import { createContext, useReducer, useEffect, ReactNode } from "react"
import Cookies from 'js-cookie'

type AuthAction = { type: 'LOGIN'; payload: any } | { type: 'LOGOUT' };
type AuthState = { user: any };

export const AuthContext = createContext<{ user: any; dispatch: React.Dispatch<AuthAction> } | undefined>(undefined);

export const authReducer = (state: AuthState, action: AuthAction): AuthState => {
    switch (action.type) {
        case 'LOGIN':
            return { user: action.payload };
        case 'LOGOUT':
            return { user: null };
        default:
            return state;
    }
};

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    });

    useEffect(() => {
        const user = Cookies.get('user');
        if (user) {
            dispatch({ type: 'LOGIN', payload: JSON.parse(user) });
        } 
    }, []);

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};