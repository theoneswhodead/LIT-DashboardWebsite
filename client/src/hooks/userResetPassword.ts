import { useState } from "react";

export const useResetPassword= () => {
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const resetPassword = async (id: string, token: string, username: string, email: string, password: string) => {
        setIsLoading(true)
        setError(null)
        console.log('test1', id, username, email, password)

        const response = await fetch(`http://localhost:5000/reset-password/${id}/${token}`, {
           method: 'POST',
           headers: {'Content-Type': 'application/json'},
           body: JSON.stringify({id, username, email, password}) 
        })
        const json = await response.json()

        if(!response.ok) {
            setIsLoading(false)
            setError(json.error)
            console.log('test4 errer',json.error, id, username, email, password)
        }

        if(response.ok) {
            console.log('test', id, username, email, password)

            setIsLoading(false)
        }
    }
    return {resetPassword, isLoading, error}
}