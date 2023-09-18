import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const useForgot = () => {
    const [error, setError] = useState<string | null>(null); 
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const forgot = async (email: string) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.post('http://localhost:5000/forgot', { email }, {
                headers: { 'Content-Type': 'application/json' }
            });

            console.log(response);

            if (response.status === 200) {
                setIsLoading(false);
                navigate('/login');
            }
        } catch (error: any) { 
            setIsLoading(false);
            setError(error.response?.data.error || "Wystąpił błąd podczas wysyłania żądania.");
        }
    }

    return { forgot, isLoading, error }
}