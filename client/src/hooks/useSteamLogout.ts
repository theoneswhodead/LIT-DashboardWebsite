import { useSteamAuthContext } from './useSteamAuthContext';
import Cookies from 'js-cookie'

export const useSteamLogout = () => {
    const { dispatch } = useSteamAuthContext();

    const steamLogout = () => {
        Cookies.remove('steamToken')
        dispatch({type: 'LOGOUT'})
    }
    
    return {steamLogout}
}