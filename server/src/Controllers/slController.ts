import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { JwtPayload } from 'jsonwebtoken'
import { UserSlOverview, ClassSlOverview, UserSlWallets } from '../models'

const createToken = (_id: object, time: string) => {
  return jwt.sign({_id}, process.env.SECRET, {expiresIn: time})
}

export const steamLogin = (req: Request, res: Response) => {
 
}

export const steamCallback = (req: Request, res: Response) => {
  if (req.user) {

    const steamId = req.user.id
    const token = createToken(steamId, '3d')
    res.cookie('steamToken', token, { maxAge: 3 * 24 * 60 * 60 * 1000 });
     
     res.redirect('http://localhost:5173/dashboard/profile');
  } else {
     
     res.redirect('http://localhost:5173/dashboard/profile');
  }
}

export const userSlOverview = (req: Request, res: Response) => {
  try {
    const token = req.cookies['steamToken']
    jwt.verify(token, process.env.SECRET, async (error: any) => {
      if(error) {
        return res.status(404).json({error: 'Token prawdopodobnie wygasł lub nie połączyłeś konta z Steam'})
      } else {

        const decodeToken = jwt.decode(token) as JwtPayload
        const userId = decodeToken._id;
        const userSlOverview = await UserSlOverview.find({ '_id': `${userId}@steam` })

        if (!userSlOverview || userSlOverview.length === 0) {
           return res.status(404).json({ error: 'Nie znaleziono użytkownika, prawdopodobnie nie grałeś u nas na serwerze, zapraszamy do gry' });
       }
        res.status(200).json(userSlOverview);
      }
    })
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}


export const walletSlOverview = (req: Request, res: Response) => {
  try {
    const token = req.cookies['steamToken']
    jwt.verify(token, process.env.SECRET, async (error: any) => {
      if(error) {
        return res.status(404).json({error: 'Token prawdopodobnie wygasł lub nie połączyłeś konta z Steam'})
      } else {

        const decodeToken = jwt.decode(token) as JwtPayload
        const userId = decodeToken._id;
        const walletSlOverview = await UserSlWallets.findOne({ '_id': `${userId}@steam` })

        if (!walletSlOverview ) {
           return res.status(404).json({ error: 'Nie znaleziono użytkownika, prawdopodobnie nie grałeś u nas na serwerze, zapraszamy do gry' });
       }
        res.status(200).json(walletSlOverview);
      }
    })
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

export const classPersonnelSlOverview = (req: Request, res: Response) => {
  try {
    const token = req.cookies['steamToken']
    jwt.verify(token, process.env.SECRET, async (error: any) => {
      if(error) {
       
        console.log('Token prawdopodobnie wygasł')
        return res.status(404).json({error: 'Token prawdopodobnie wygasł lub nie połączyłeś konta z Steam'})
      } else {

        const decodeToken = jwt.decode(token) as JwtPayload
        const userId = decodeToken._id;
       
        const classSlOverview = await ClassSlOverview.aggregate([
          {
            $match: {
              _id: `${userId}@steam`
            }
          },
          {
            $unwind: "$roleStats"
          },
          {
            $match: {
              "roleStats._t": "EscapistRole"
            }
          }
        ]);
    
        if (!classSlOverview ||classSlOverview.length === 0) {
          console.log('Nie znaleziono usera')
           return res.status(404).json({ error: 'Nie znaleziono użytkownika, prawdopodobnie nie grałeś u nas na serwerze, zapraszamy do gry' });
       }
        res.status(200).json(classSlOverview);
      }
    })

  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

export const classMtfSlOverview = (req: Request, res: Response) => { 
  try {
    const token = req.cookies['steamToken']
    jwt.verify(token, process.env.SECRET, async (error: any) => {
      if(error) {
        return res.status(404).json({error: 'Token prawdopodobnie wygasł lub nie połączyłeś konta z Steam'})
      } else {

        const decodeToken = jwt.decode(token) as JwtPayload
        const userId = decodeToken._id;
       
        const classSlOverview = await ClassSlOverview.aggregate([
          {
            $match: {
              _id: `${userId}@steam`
            }
          },
          {
            $unwind: "$roleStats"
          },
          {
            $match: {
              "roleStats._t": "MTFRole"
            }
          }
        ]);
    
        if (!classSlOverview || classSlOverview.length === 0) {
           return res.status(404).json({ error: 'Nie znaleziono użytkownika, prawdopodobnie nie grałeś u nas na serwerze, zapraszamy do gry' });
       }
        res.status(200).json(classSlOverview);
      }
    })

  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

export const classChaosSlOverview = (req: Request, res: Response) => { 
  try {
    const token = req.cookies['steamToken']
    jwt.verify(token, process.env.SECRET, async (error: any) => {
      if(error) {
        return res.status(404).json({error: 'Token prawdopodobnie wygasł lub nie połączyłeś konta z Steam'})
      } else {

        const decodeToken = jwt.decode(token) as JwtPayload
        const userId = decodeToken._id;
        
        const classSlOverview = await ClassSlOverview.aggregate([
          {
            $match: {
              _id: `${userId}@steam`
            }
          },
          {
            $unwind: "$roleStats"
          },
          {
            $match: {
              "roleStats._t": "CHIRole"
            }
          }
        ]);
    
        if (!classSlOverview || classSlOverview.length === 0) {
           return res.status(404).json({ error: 'Nie znaleziono użytkownika, prawdopodobnie nie grałeś u nas na serwerze, zapraszamy do gry' });
       }
        res.status(200).json(classSlOverview);
      }
    })

  } catch (error) {
    res.status(400).json({error: error.message})
  }
}


export const classScpSlOverview = (req: Request, res: Response) => { 
  try {
    const token = req.cookies['steamToken']
    jwt.verify(token, process.env.SECRET, async (error: any) => {
      if(error) {
        return res.status(404).json({error: 'Token prawdopodobnie wygasł lub nie połączyłeś konta z Steam'})
      } else {

        const decodeToken = jwt.decode(token) as JwtPayload
        const userId = decodeToken._id;
    
        const classSlOverview = await ClassSlOverview.aggregate([
          {
            $match: {
              _id: `${userId}@steam`
            }
          },
          {
            $unwind: "$roleStats"
          },
          {
            $match: {
              "roleStats._t": "SCPRole"
            }
          }
        ]);
    
        if (!classSlOverview || classSlOverview.length === 0) {
           return res.status(404).json({ error: 'Nie znaleziono użytkownika, prawdopodobnie nie grałeś u nas na serwerze, zapraszamy do gry' });
       }
        res.status(200).json(classSlOverview);
      }
    })

  } catch (error) {
    res.status(400).json({error: error.message})
  }
}