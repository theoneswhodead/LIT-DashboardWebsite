import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { JwtPayload } from 'jsonwebtoken'
import { UserOverview, ServerOverview, TextChannelOverview, VoiceChannelOverview } from '../models'

const createToken = (_id: object, time: string) => {
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: time})
  }

  export const userDiscordOverview = async (req: Request, res: Response) => {
    try {
      const token = req.cookies['discordToken']

      jwt.verify(token, process.env.SECRET, async (error: any) => {
        if(error) {
         
          return res.status(404).json({error: 'Token prawdopodobnie wygasł lub nie połączyłeś konta z Discord'})
        } else {
         
          const decodeToken = jwt.decode(token) as JwtPayload
          const userId = decodeToken._id;

         const userSchemaInstance = await UserOverview.aggregate([
          {
            $match: { 'users.userId': userId }
          },
          {
            $unwind: '$users'
          },
          {
            $match: { 'users.userId': userId }
          },
          {
            $project: {
              userId: '$users.userId',
              userName: '$users.userName',
              dailyStats: '$users.dailyStats'
            }
          },
          {
            $group: {
              _id: '$_id',
              userId: { $first: '$userId' },
              userName: { $first: '$userName' },
              dailyStats: { $first: '$dailyStats' }
            }
          }
        ]);
          if(!userSchemaInstance || userSchemaInstance.length === 0) {
            return res.status(404).json({ error: 'Nie znaleziono danych użytkownika' });
          }

          res.status(200).json(userSchemaInstance[0]);
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
        return res.status(404).json({error: 'Token prawdopodobnie wygasł lub nie połączyłeś konta z Discord'})
      } else {
        const serverOverview = await ServerOverview.findOne({ 'guildId': '473863145207889931' }) //temp 
        if (!serverOverview ) {
           return res.status(404).json({ error: 'Nie znaleziono serwera, prawdopodobnie bot nie znajduje się na serwerze, bądź zaszedł inny nieznany błąd' });
       }
        res.status(200).json(serverOverview)
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
        return res.status(404).json({error: 'Token prawdopodobnie wygasł lub nie połączyłeś konta z Discord'})
      } else {

        const textChannelOverview = await TextChannelOverview.findOne({ 'guildId': '473863145207889931' }) //temp 
    
        if (!textChannelOverview) {
           return res.status(404).json({ error: 'Nie znaleziono serwera, prawdopodobnie bot nie znajduje się na serwerze, bądź zaszedł inny nieznany błąd' });
       }
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
     jwt.verify(token, process.env.SECRET, async (error: any) => {
       if(error) {
         return res.status(404).json({error: 'Token prawdopodobnie wygasł lub nie połączyłeś konta z Discord'})
       } else {
        
         const voiceChannelOverview = await VoiceChannelOverview.findOne({ 'guildId': '473863145207889931' }) //temp 
         if (!voiceChannelOverview) {
            return res.status(404).json({ error: 'Nie znaleziono serwera, prawdopodobnie bot nie znajduje się na serwerze, bądź zaszedł inny nieznany błąd' });
        }
         res.status(200).json(voiceChannelOverview);
       }
     })
 
   } catch (error) {
     res.status(400).json({error: error.message})
   }
}