import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const useLogin = () => {
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const { dispatch } = useAuthContext();

    const login = async (email: string, password: string) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.post('http://localhost:5000/login', { email, password }, {
                headers: { 'Content-Type': 'application/json' }
            });

            const json = response.data;

            if (response.status === 200) {
                localStorage.setItem('user', JSON.stringify(json));
                dispatch({ type: 'LOGIN', payload: json });
                setIsLoading(false);
                navigate('/dashboard');
                
            } else {
                setIsLoading(false);
                setError(json.error);
            }
        } catch (error: any) {
            setIsLoading(false);
            setError(error.response?.data.error || "Wystąpił błąd podczas wysyłania żądania.");
        }
    };

    return { login, isLoading, error };
};