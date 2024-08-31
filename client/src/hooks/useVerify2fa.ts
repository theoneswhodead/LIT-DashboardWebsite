import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from "axios";
import Cookies from 'js-cookie'
import { useNavigate } from "react-router-dom";

export const useVerify2fa = () => {
    const [errorVerify, setErrorVerify] = useState<string | null>(null);
    const [isLoadingVerify, setIsLoadingVerify] = useState<boolean>(false);
    const navigate = useNavigate();

    const { dispatch } = useAuthContext();

    const verify2fa = async ( code: string, currentPassword: string, token: string) => {
        setIsLoadingVerify(true);
        setErrorVerify(null);

        try {


                const response = await axios.post('http://localhost:5000/dashboard/profile/settings', {
                    token,
                    code,
                    currentPassword
                }, {
                    headers: { 'Content-Type': 'application/json' }
                });
    
                const json = response.data;

                if (response.status === 200) {
                  Cookies.set('user', JSON.stringify(json), { expires: 3 })
                    dispatch({ type: 'LOGIN', payload: json });
                    setIsLoadingVerify(false);
                    navigate('/dashboard/overview');
    
                } else {
                    setIsLoadingVerify(false);
                    setErrorVerify(json.error);
                }
           

        } catch (error: any) {
            setIsLoadingVerify(false);
            setErrorVerify(error.response?.data.error || "Wystąpił błąd podczas wysyłania żądania.");
        }
    };

    return { verify2fa, isLoadingVerify, errorVerify };
};
