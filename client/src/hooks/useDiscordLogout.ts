import { useDiscordAuthContext } from "./useDiscordAuthContext";
import Cookies from 'js-cookie'

export const useDiscordLogout = () => {
    const { dispatch } = useDiscordAuthContext();

    const discordLogout = () => {
        Cookies.remove('discordToken')
        dispatch({type: 'LOGOUT'})
    }
    
    return {discordLogout}
}