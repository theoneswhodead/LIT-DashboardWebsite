import { Request, Response } from 'express'
import axios from 'axios'
import jwt from 'jsonwebtoken'
import { JwtPayload } from 'jsonwebtoken'
import UserOverview from '../models/userDiscordOverview'
const mongoose = require('mongoose');

const createToken = (_id: object, time: string) => {
  return jwt.sign({_id}, process.env.SECRET, {expiresIn: time})
}

export const dashboard = (req: Request, res: Response) => {

}

export const discordLogin = (req: Request, res: Response) => {
    const url = 'https://discord.com/api/oauth2/authorize?client_id=1153269554210951208&redirect_uri=http%3A%2F%2Flocalhost%3A5000%2Fdashboard%2Fauth%2Fdiscord%2Fcallback&response_type=code&scope=identify'

    res.redirect(url)
}

export const discordCallback = async (req: Request, res: Response) => {

    try {
        const { code } = req.query;

        if(!code) {
            throw Error('Brakujący kod')
        }

        const paramsObject = {
            client_id: process.env.DISCORD_CLIENT_ID,
            client_secret: process.env.DISCORD_CLIENT_SECRET,
            grant_type: 'authorization_code',
            code,
            redirect_uri: process.env.DISCORD_REDIRECT_URI
          };
          
          const params = new URLSearchParams(paramsObject as Record<string, string>);

          const headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept-Encoding': 'application/x-www-form-urlencoded'
          };
         

          const response = await axios.post(
            'https://discord.com/api/oauth2/token',
            params,
            {
              headers
            }
          );

          const userResponse = await axios.get('https://discord.com/api/users/@me', {
            headers: {
              Authorization: `Bearer ${response.data.access_token}`,
              ...headers
            }
          });

          const { id, username, avatar } = userResponse.data

          const token = createToken(id, '3d')

          res.cookie('discordToken', token, { maxAge: 3 * 24 * 60 * 60 * 1000 });

          res.redirect('http://localhost:5173/dashboard/profile'); 

        
    } catch (error) {
        res.status(400).json({error: error.message})
    }
    
}

export const userDiscordOverview = async (req: Request, res: Response) => {
    try {
      const token = req.cookies['discordToken']
      //res.send(req.cookies['discordToken'])
      //console.log(req.cookies)
      console.log(req.cookies['discordToken'])
     // res.status(200).json(token)

      jwt.verify(token, process.env.SECRET, async (error: any) => {
        if(error) {
         
          console.log('Token prawdopodobnie wygasł')
          return res.json({error: 'Token prawdopodobnie wygasł lub nie połączyłeś konta z Discord'})
      } else {
         
        const decodeToken = jwt.decode(token) as JwtPayload

        

        const userId = decodeToken._id;

        // if (!mongoose.Types.ObjectId.isValid(_id)) {
        //   return res.status(400).json({ error: 'Nieprawidłowy identyfikator ObjectId' });
        //  // console.log('invalid id')
        // }
      
        console.log(userId)
    
       //const userOverview = await UserOverview.findById(_id)

      // if(!userOverview) {
      //   return res.status(404).json({error: 'Nie znaleziono danych'})
      // }
      // res.status(200).json(userOverview)

      const userOverview = await UserOverview.findOne({ 'users.userId': userId })
      
        if (!userOverview) {
          return res.status(404).json({ error: 'Nie znaleziono użytkownika' });
        }
      
        // Teraz masz dostęp do userOverview, który zawiera odpowiednią instancję userSchema
        const userSchemaInstance = userOverview.users.find((user: any) => user.userId === userId);
      
        if (!userSchemaInstance) {
          return res.status(404).json({ error: 'Nie znaleziono danych użytkownika' });
        }
      
        // Możesz teraz wyświetlić lub przetwarzać dane dla tego użytkownika
        res.status(200).json(userSchemaInstance);
      
          

      }
      })

    } catch (error) {
      res.status(400).json({error: error.message})
    }
}

export const serverDiscordOverview = async (req: Request, res: Response) => {
  
}

export const textChannelOverview = async (req: Request, res: Response) => {
  
}

export const voiceChannelOverview = async (req: Request, res: Response) => {
  
}