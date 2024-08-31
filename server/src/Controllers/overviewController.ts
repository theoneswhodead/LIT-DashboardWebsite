import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { UserOverview, TextChannelOverview, UserSlOverview, UserSlWallets } from '../models'

export const usersDiscordOverview = (req: Request, res: Response) => {
    try {
      const token = req.cookies['discordToken']
  
      jwt.verify(token, process.env.SECRET, async (error: any) => {
        if(error) {
          return res.status(404).json({error: 'Token prawdopodobnie wygasł lub nie połączyłeś konta z Discord'})
        } else {
          const usersOverview = await UserOverview.find({})
          .select('users.userName users.dailyStats -_id');
      
          if (!usersOverview || usersOverview.length === 0) {
             return res.status(404).json({ error: 'Nie znaleziono użytkowników, prawdopodobnie bota nie ma na serwerze' });
         }
          res.status(200).json(usersOverview);
        }
      })
  
    } catch (error) {
      res.status(400).json({error: error.message})
    }
  }
  
  export const textChannelsOverview = (req: Request, res: Response) => {
    try {
      const token = req.cookies['discordToken']
  
      jwt.verify(token, process.env.SECRET, async (error: any) => {
        if(error) {
          return res.status(404).json({error: 'Token prawdopodobnie wygasł lub nie połączyłeś konta z Discord'})
        } else {
          const textChannelsOverview = await TextChannelOverview.find({ 'guildId': '473863145207889931' }) //temp 
      
          if (!textChannelsOverview || textChannelsOverview.length === 0) {
             return res.status(404).json({ error: 'Nie znaleziono danych serwera, prawdopodobnie bota nie ma na serwerze' });
         }
          res.status(200).json(textChannelsOverview);
        }
      })
  
    } catch (error) {
      res.status(400).json({error: error.message})
    }
  }
  
  export const usersSlTimeOverview = (req: Request, res: Response) => {
    try {
      const token = req.cookies['steamToken']
      jwt.verify(token, process.env.SECRET, async (error: any) => {
        if(error) {
          return res.status(404).json({error: 'Token prawdopodobnie wygasł lub nie połączyłeś konta z Steam'})
        } else {
          const usersSlOverview = await UserSlOverview.find({})
          .select('nickname ignoreDNT dntEnabled dailyStats -_id')
  
          if (!usersSlOverview || usersSlOverview.length === 0) {
             return res.status(404).json({ error: 'Nie znaleziono danych z serwera, prawdopodobnie plugin przestał działać' });
         }
          res.status(200).json(usersSlOverview);
        }
      })
  
    } catch (error) {
      res.status(400).json({error: error.message})
    }
  }
  
  export const usersSlKillsOverview = (req: Request, res: Response) => {
    try {
      const token = req.cookies['steamToken']
      jwt.verify(token, process.env.SECRET, async (error: any) => {
        if(error) {
         
          return res.status(404).json({error: 'Token prawdopodobnie wygasł lub nie połączyłeś konta z Steam'})
        } else {
          const usersSlOverview = await UserSlOverview.find({})
          .select('nickname ignoreDNT dntEnabled dailyStats -_id')
  
          if (!usersSlOverview || usersSlOverview.length === 0) {
             return res.status(404).json({ error: 'Nie znaleziono danych z serwera, prawdopodobnie plugin przestał działać' });
         }
          res.status(200).json(usersSlOverview);
        }
      })
  
    } catch (error) {
      res.status(400).json({error: error.message})
    }
  }
  
  export const usersSlShotsOverview = (req: Request, res: Response) => {
    try {
      const token = req.cookies['steamToken']
      jwt.verify(token, process.env.SECRET, async (error: any) => {
        if(error) {
          return res.status(404).json({error: 'Token prawdopodobnie wygasł lub nie połączyłeś konta z Steam'})
        } else {
  
          const usersSlOverview = await UserSlOverview.find({})
          .select('nickname ignoreDNT dntEnabled dailyStats -_id')
  
          if (!usersSlOverview || usersSlOverview.length === 0) {
             return res.status(404).json({ error: 'Nie znaleziono danych z serwera, prawdopodobnie plugin przestał działać' });
         }
          res.status(200).json(usersSlOverview);
        }
      })
  
    } catch (error) {
      res.status(400).json({error: error.message})
    }
  }

export const usersSlJumpsOverview = (req: Request, res: Response) => {
    try {
      const token = req.cookies['steamToken']
      jwt.verify(token, process.env.SECRET, async (error: any) => {
        if(error) {
          return res.status(404).json({error: 'Token prawdopodobnie wygasł lub nie połączyłeś konta z Steam'})
        } else {
  
          const usersSlJumpsOverview = await UserSlOverview.find({})
          .select('nickname ignoreDNT dntEnabled dailyStats -_id')
  
          if (!usersSlJumpsOverview || usersSlJumpsOverview.length === 0) {
             return res.status(404).json({ error: 'Nie znaleziono danych z serwera, prawdopodobnie plugin przestał działać' });
         }
          res.status(200).json(usersSlJumpsOverview);
        }
      })
  
    } catch (error) {
      res.status(400).json({error: error.message})
    }
  }
  
  
  export const walletsSlOverview = (req: Request, res: Response) => {
    try {
      const token = req.cookies['steamToken']
      jwt.verify(token, process.env.SECRET, async (error: any) => {
        if(error) {
          return res.status(404).json({error: 'Token prawdopodobnie wygasł lub nie połączyłeś konta z Steam'})
        } else {
          const usersSlWallets = await UserSlWallets.find({})
          .select('nickname ignoreDNT wallet -_id')
  
          if (!usersSlWallets || usersSlWallets.length === 0) {
             return res.status(404).json({ error: 'Nie znaleziono danych z serwera, prawdopodobnie plugin przestał działać' });
         }
          res.status(200).json(usersSlWallets);
        }
      })
  
    } catch (error) {
      res.status(400).json({error: error.message})
    }
  }
  
  export const classesSlOverview = (req: Request, res: Response) => {
  
  }