import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const useResetPassword = () => {
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const resetPassword = async (id: string | undefined, token: string | undefined, password: string) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.post(`http://localhost:5000/reset-password/${id}/${token}`, {
                id,
                token,
                password
            }, {
                headers: { 'Content-Type': 'application/json' }
            });

            const json = response.data;

            if (response.status === 200) {
                setIsLoading(false);
                    navigate('/login')
            } else {
                setIsLoading(false);
                setError(json.error);

            }
        } catch (error: any) {
            setIsLoading(false);
            setError(error.response?.data.error || "Wystąpił błąd podczas wysyłania żądania.");
        }
    };

    return { resetPassword, isLoading, error };
};