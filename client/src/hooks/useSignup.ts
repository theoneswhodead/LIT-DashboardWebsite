import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const { dispatch } = useAuthContext();

    const signup = async (username: string, email: string, password: string) => {
        setIsLoading(true)
        setError(null)

        console.log('Signup use',username, email)

        const response = await fetch('http://localhost:5000/signup', {
           method: 'POST',
           headers: {'Content-Type': 'application/json'},
           body: JSON.stringify({username, email, password}) 
        })
        const json = await response.json()

        console.log('response ',response)

        if(!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }

        if(response.ok) {
            localStorage.setItem('user', JSON.stringify(json))

            console.log('ok ', JSON.stringify(json))

            dispatch({type: 'LOGIN', payload: json})
            setIsLoading(false)
        }
    }
    return {signup, isLoading, error}
}