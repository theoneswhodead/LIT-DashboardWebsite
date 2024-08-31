import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios"; 
import Cookies from 'js-cookie'

export const useSignup = () => {
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const { dispatch } = useAuthContext();

    const signup = async (username: string, email: string, password: string) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.post('http://localhost:5000/signup', {
                username,
                email,
                password
            }, {
                headers: { 'Content-Type': 'application/json' }
            });

            const json = response.data;

            if (response.status === 200) {
                Cookies.set('user', JSON.stringify(json), { expires: 3 })
                dispatch({ type: 'LOGIN', payload: json });
                setIsLoading(false);
                navigate('/dashboard/overview');

            } else {
                setIsLoading(false);
                setError(json.error);
            }
        } catch (error: any) {
            setIsLoading(false);
            setError(error.response?.data.error || "Wystąpił błąd podczas wysyłania żądania.");
        }
    };

    return { signup, isLoading, error };
};
