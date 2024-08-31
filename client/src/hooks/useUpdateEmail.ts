import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from "axios";
import Cookies from 'js-cookie'

export const useUpdateEmail = () => {
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { dispatch } = useAuthContext();

    const updateEmail = async (newEmail: string, currentPassword: string) => {
        setIsLoading(true);
        setError(null);

        try {
            interface User {
                email: string;
                token: string;
              }
              
              const userString = Cookies.get('user')
              
              if (userString !== undefined) {
                const user: User = JSON.parse(userString);
                const token: string = user.token;

                const response = await axios.post('http://localhost:5000/dashboard/profile/settings', {
                    token,
                    newEmail,
                    currentPassword
                }, {
                    headers: { 'Content-Type': 'application/json' }
                });
    
                const json = response.data;
    
                if (response.status === 200) {
                    const cookie = Cookies.get('user')

                    if(cookie) {
                        const parseCookie = JSON.parse(cookie)
                        const newCookie = {...parseCookie, email: json.email }
                        Cookies.remove("user")
    
                        Cookies.set('user', JSON.stringify(newCookie), { expires: 3 })
                    }
                    dispatch({ type: 'LOGIN', payload: json });
                    setIsLoading(false);
    
                } else {
                    setIsLoading(false);
                    setError(json.error);
                }
              }

        } catch (error: any) {
            setIsLoading(false);
            setError(error.response?.data.error || "Wystąpił błąd podczas wysyłania żądania.");
        }
    };

    return { updateEmail, isLoading, error };
};
