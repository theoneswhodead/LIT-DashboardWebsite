import { Request, Response } from 'express'
import axios from 'axios'
import jwt from 'jsonwebtoken'
import { JwtPayload } from 'jsonwebtoken'

import { UserOverview, ServerOverview, TextChannelOverview, VoiceChannelOverview } from '../models'
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

      jwt.verify(token, process.env.SECRET, async (error: any) => {
        if(error) {
         
          console.log('Token prawdopodobnie wygasł')
          return res.json({error: 'Token prawdopodobnie wygasł lub nie połączyłeś konta z Discord'})
        } else {
         
          const decodeToken = jwt.decode(token) as JwtPayload
          const userId = decodeToken._id;
          const userOverview = await UserOverview.find({ 'users.userId': userId })
      
          if (!userOverview) {
             return res.status(404).json({ error: 'Nie znaleziono użytkownika' });
         }

          const userSchemaInstance = userOverview[1].users.find((user: any) => user.userId === userId); // wybór serwera 

          if (!userSchemaInstance) {
             return res.status(404).json({ error: 'Nie znaleziono danych użytkownika' });
          }

          res.status(200).json(userSchemaInstance);

        }
      })

    } catch (error) {
      res.status(400).json({error: error.message})
    }
}

export const serverDiscordOverview = async (req: Request, res: Response) => {
  try {
    const token = req.cookies['discordToken']

    jwt.verify(token, process.env.SECRET, async (error: any) => {
      if(error) {
       
        console.log('Token prawdopodobnie wygasł')
        return res.json({error: 'Token prawdopodobnie wygasł lub nie połączyłeś konta z Discord'})
      } else {
       
        const serverOverview = await ServerOverview.find({ 'guildId': '629714082072887312' }) //temp 
    
        if (!serverOverview) {
           return res.status(404).json({ error: 'Nie znaleziono servera' });
       }

        res.status(200).json(serverOverview);

      }
    })

  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

export const textChannelOverview = async (req: Request, res: Response) => {
  try {
    const token = req.cookies['discordToken']

    jwt.verify(token, process.env.SECRET, async (error: any) => {
      if(error) {
       
        console.log('Token prawdopodobnie wygasł')
        return res.json({error: 'Token prawdopodobnie wygasł lub nie połączyłeś konta z Discord'})
      } else {
       
        const textChannelOverview = await TextChannelOverview.find({ 'guildId': '629714082072887312' }) //temp 
    
        if (!textChannelOverview) {
           return res.status(404).json({ error: 'Nie znaleziono servera' });
       }
        console.log('textChannelOverview ',textChannelOverview)

        res.status(200).json(textChannelOverview);

      }
    })

  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

export const voiceChannelOverview = async (req: Request, res: Response) => {
  try {
     const token = req.cookies['discordToken']
      console.log(token)
     jwt.verify(token, process.env.SECRET, async (error: any) => {
      console.log('error1 ', error)
       if(error) {
        console.log('error2 ', error)
        
         console.log('Token prawdopodobnie wygasł')
         return res.json({error: 'Token prawdopodobnie wygasł lub nie połączyłeś konta z Discord'})
       } else {
        
         const voiceChannelOverview = await VoiceChannelOverview.find({ 'guildId': '629714082072887312' }) //temp 
     
         if (!voiceChannelOverview) {
            return res.status(404).json({ error: 'Nie znaleziono servera' });
        }
         res.status(200).json(voiceChannelOverview);
       }
     })
 
   } catch (error) {
     res.status(400).json({error: error.message})
   }
}