import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const navigate = useNavigate()

    const { dispatch } = useAuthContext();

    const login = async (email: string, password: string) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch('http://localhost:5000/login', {
           method: 'POST',
           headers: {'Content-Type': 'application/json'},
           body: JSON.stringify({email, password}) 
        })
        const json = await response.json()

        if(!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }

        if(response.ok) {
            localStorage.setItem('user', JSON.stringify(json))

            dispatch({type: 'LOGIN', payload: json})
            setIsLoading(false)

            navigate('/dashboard') 
        }
    }
    return {login, isLoading, error}
}