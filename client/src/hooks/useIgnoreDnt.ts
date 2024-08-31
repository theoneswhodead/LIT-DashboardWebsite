import { useState } from "react";
import axios from "axios";
import Cookies from 'js-cookie'

export const useIgnoreDnt = () => {
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const ignoreDnt = async (userSlWallets: boolean, userSlOverview: boolean, classSlOverview: boolean, ) => {
        setIsLoading(true);
        setError(null);

        try {
              const token = Cookies.get('steamToken')
              
              if (token !== undefined) {

                const response = await axios.post('http://localhost:5000/dashboard/profile/ignorednt', {
                   token,
                   userSlWallets,
                   userSlOverview,
                   classSlOverview,
                }, {
                    headers: { 'Content-Type': 'application/json' }
                });
    
                const json = response.data;
    
                if (response.status === 200) {

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

    return { ignoreDnt, isLoading, error };
};
