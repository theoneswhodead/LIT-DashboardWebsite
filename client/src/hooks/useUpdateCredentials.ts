import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from "axios"; 

export const useUpdateCredentials = () => {
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { dispatch } = useAuthContext();

    const updateCredentials = async (username: string, email: string, password: string) => {
        setIsLoading(true);
        setError(null);

        try {
            interface User {
                username: string;
                email: string;
                token: string;
              }
              
              const userString = localStorage.getItem('user');
              
              if (userString !== null) {
                const user: User = JSON.parse(userString);
                const token: string = user.token;

                const response = await axios.post('http://localhost:5000/dashboard/profile', {
                    token,
                    username,
                    email,
                    password
                }, {
                    headers: { 'Content-Type': 'application/json' }
                });
    
                const json = response.data;
    
                if (response.status === 200) {
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

    return { updateCredentials, isLoading, error };
};
