import { useState } from "react";

export const useForgot = () => {
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const forgot = async (email: string) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch('http://localhost:5000/forgot', {
           method: 'POST',
           headers: {'Content-Type': 'application/json'},
           body: JSON.stringify({email}) 
        })
        const json = await response.json()

        if(!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }

        if(response.ok) {

            setIsLoading(false)
        }
    }
    return {forgot, isLoading, error}
}