import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useResetPassword= () => {
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const navigate = useNavigate();

    const resetPassword = async (id: string | undefined, token: string | undefined, username: string, email: string, password: string) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch(`http://localhost:5000/reset-password/${id}/${token}`, {
           method: 'POST',
           headers: {'Content-Type': 'application/json'},
           body: JSON.stringify({id, token, username, email, password}) 
        })
        const json = await response.json()

        if(!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }

        if(response.ok) {
            setIsLoading(false)
            navigate('/login');
        }
    }
    return {resetPassword, isLoading, error}
}