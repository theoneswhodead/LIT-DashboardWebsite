import { useDiscordAuthContext } from "./useDiscordAuthContext";
import Cookie from 'js-cookie'

export const useDiscordLogout = () => {
    const { dispatch } = useDiscordAuthContext();

    const discordLogout = () => {
        Cookie.remove('discordToken')

        dispatch({type: 'LOGOUT'})
    }
    
    return {discordLogout}
}