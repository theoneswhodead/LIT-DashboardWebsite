import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/userModel'
import { JwtPayload } from 'jsonwebtoken'
import OTPAuth from "otpauth";
import { encode } from "hi-base32";
import QRCode from 'qrcode';
import crypto from 'crypto';
import { google } from 'googleapis';
import nodemailer from 'nodemailer'
import 'dotenv/config'
import { UserSlOverview, ClassSlOverview, UserSlWallets } from '../models'


const createToken = (_id: object, time: string) => {
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: time})
}

export const userLogin = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const user = await User.login(email, password)
        const username = user.username
        const enable2fa = user.enable2fa
        const token = createToken(user._id, '3d')

        res.status(200).json({ username , email, enable2fa, token})

    } catch (error) {
        res.status(400).json({error: error.message}) 
    }
}

export const userSignup = async (req: Request, res: Response) => {
    const { username, email, password } = req.body;

    try {

        const user = await User.signup(username, email, password)
        const enable2fa = user.enable2fa
        const token = createToken(user._id, '3d')

        res.status(200).json({username, email, enable2fa, token})
    } catch (error) {
        res.status(400).json({error: error.message})
        
    }
}

export const userForgot = async (req: Request, res: Response) => {
    const { email } = req.body;

    try {

        const user = await User.forgot(email)
        const token = createToken(user._id, '1m')
        const base64Token = Buffer.from(token).toString("base64");
        const oAuth2Client = new google.auth.OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET, process.env.REDIRECT_URI)
        oAuth2Client.setCredentials({refresh_token: process.env.REFRESH_TOKEN})
        const link = `http://localhost:5173/reset-password/${user._id}/${base64Token}`

        const sendMail = async (email:any, link:any) => {
            try {
                const accessToken = await oAuth2Client.getAccessToken()
                const transport = nodemailer.createTransport({
                    // service: 'gmail',
                    // secure: false,
                    host: 'smtp.gmail.com',
                    port: 587,
                    secure: false,
                    auth: {
                        type: 'OAuth2',
                        user: 'goldlegends.kontakt@gmail.com',
                        clientId: process.env.CLIENT_ID,
                        clientSecret: process.env.CLIENT_SECRET,
                        refreshToken: process.env.REFRESH_TOKEN,
                        accessToken: accessToken.token
                    },
                    tls: {
                        rejectUnauthorized: false // Opcja do ustawienia na false -> SSL ADD
                    }
                })

                const mailOptions = {
                    from: 'GoldLegends <goldlegends.kontakt@gmail.com>',
                    to: email,
                    subject: 'Resetowanie Hasła',
                    html: `<h1>Resetowanie hasła</h1> 
                    <p>Właśnie otrzymaliśmy prośbę o zresetowanie hasła do konta: ${email}</p> 
                    <p>Aby zresetować hasło, kliknij link (lub skopiuj go i wklej do przeglądarki): ${link}</p>
                    <p>Jeśli nie prosiłeś o zresetowanie hasła, po prostu zignoruj tę wiadomość e-mail. Na koncie nie zostaną wprowadzone żadne zmiany.</p>` 
                }

                const result = await transport.sendMail(mailOptions)
                res.status(200).json(user); 
                console.log('Email sent...', result);
            } catch (error) {
                console.error('Error sending email:', error);
                res.status(500).json({ error: 'Wystąpił błąd podczas wysyłania maila.' });
            }
        }

        sendMail(email, link);

    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

export const userResetPassword = async (req: Request, res: Response) => {

    const { id, token, password } = req.body;
    try {

        const decodedToken = Buffer.from(token, "base64").toString("utf-8");

       jwt.verify(decodedToken, process.env.SECRET, async (error) => {
            if(error) {
                return res.status(400).json({error: 'Token prawdopodobnie wygasł'})
            } else {
                try {
                    const user = await User.resetPassword(id, password);
                    res.status(200).json(user);
                } catch (error) {
                    res.status(400).json({ error: error.message });
                }
            }
       })

    } catch (error) {
        res.status(400).json({error: error.message}) 
    }
}

export const  userUpdateCredentials = async (req: Request, res: Response) => {
    const {token, newUsername, newEmail, newPassword, currentPassword, code } = req.body;

    try {

        const decodeToken = jwt.decode(token) as JwtPayload
        const id = decodeToken._id 

        if((newUsername || newEmail || newPassword) && (code == '' || code == undefined || !code)) {
            const user = await User.updateCredentials(id, currentPassword, newUsername, newEmail, newPassword) 
            const username = user.username
            const email = user.email
            const enable2fa = user.enable2fa
            res.status(200).json({ username , email, enable2fa, token})
        } else {
            if(code == '' || code == undefined || !code){
                throw Error('Uzupełnij wszystkie pola')
            } else if(code) {
                const user = await User.verify2fa(id, currentPassword, code)
                const username = user.username
                const email = user.email
                const enable2fa = user.enable2fa
                res.status(200).json({ username , email, enable2fa, token})
            }
        }
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

export const enable2fa = async (req: Request, res: Response) => {
    try {
        const userCookie = req.cookies['user']
        const parseCookie = JSON.parse(userCookie)
        const token = parseCookie.token

        const generateBase32Secret = () => {
            const buffer = crypto.randomBytes(15);
            const base32 = encode(buffer).replace(/=/g, "").substring(0, 24);
            return base32;
          };

        jwt.verify(token, process.env.SECRET, async (error: any) => {
          if(error) {

            return res.status(404).json({error: 'Coś poszło nie tak :c'})
          } else {

            const decodeToken = jwt.decode(token) as JwtPayload
            const id = decodeToken._id 
            const base32_secret = generateBase32Secret(); 
            const userBeforeUpdate = await User.findOneAndUpdate(
            {'_id': id},
            { $set: {
                'secret2fa': `${base32_secret}`,
                 'enable2fa': false
            }
        })

        if(!userBeforeUpdate) {
            return res.status(404).json({error: 'Coś poszło nie tak :c'})
        }

        let totp = new OTPAuth.TOTP({
            issuer: "https://www.goldenleague.pl",
            label: "GoldenLeague",
            algorithm: "SHA1",
            digits: 6,
            secret: base32_secret,
        });

        let otpauth_url = totp.toString();
        const user = await User.findOne({'_id': id})
        const username = user.username
        const email = user.email
        const enable2fa = user.enable2fa
        QRCode.toDataURL(otpauth_url, (err, qrUrl) => {
            if(err) {
                return res.status(500).json({
                    status: 'fail',
                    message: "Błąd podczas generowania kodu QR"
                })
            }
            res.status(200).json({ 
                user: {
                  username,
                  email,
                  enable2fa,
                  token
                },
                data: {
                    qrCodeUrl: qrUrl,
                    secret: base32_secret
                }
            })
        })}
         })
      } catch (error) {
        res.status(400).json({error: error.message})
      }
}


export const ignoreDnt = async (req: Request, res: Response) => {

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
                  $project: {
                    _id: 0, 
                    ignoreDNT: 1 
                  }
                }
              ]);

              const userSlOverview = await UserSlOverview.aggregate([
                {
                  $match: {
                    _id: `${userId}@steam` 
                  }
                },
                {
                  $project: {
                    _id: 0, 
                    ignoreDNT: 1 
                  }
                }
              ]);

              
              const userSlWallets = await UserSlWallets.aggregate([
                {
                  $match: {
                    _id: `${userId}@steam` 
                  }
                },
                {
                  $project: {
                    _id: 0, 
                    ignoreDNT: 1 
                  }
                }
              ]);
        
            if (!classSlOverview || classSlOverview.length === 0) {
               return res.status(404).json({ error: 'Nie znaleziono użytkownika, prawdopodobnie nie grałeś u nas na serwerze, zapraszamy do gry' });
           }
            res.status(200).json({classSlOverview, userSlOverview, userSlWallets});
          }
        })
    
      } catch (error) {
        res.status(400).json({error: error.message})
      }
}



export const updateIgnoreDnt = async (req: Request, res: Response) => {
    const { token, userSlWallets, userSlOverview, classSlOverview } = req.body;
  try {
      jwt.verify(token, process.env.SECRET, async (error: any) => {
        if(error) {
          return res.status(404).json({error: 'Token prawdopodobnie wygasł lub nie połączyłeś konta z Steam'})
        } else {

          const decodeToken = jwt.decode(token) as JwtPayload
          const userId = decodeToken._id;

          const updatedClassSlOverview = await ClassSlOverview.findOneAndUpdate({
            '_id': `${userId}@steam` ,
        }, {
            $set: {
                 'ignoreDNT': classSlOverview 
            }
        })

        const updatedUserSlOverview = await UserSlOverview.findOneAndUpdate({
          '_id': `${userId}@steam` ,
      }, {
          $set: {
               'ignoreDNT': userSlOverview 
          }
      })

      const updatedUserSlWallets = await UserSlWallets.findOneAndUpdate({
        '_id': `${userId}@steam` ,
    }, {
        $set: {
             'ignoreDNT': userSlWallets 
        }
    })
          if (!updatedClassSlOverview || !updatedUserSlOverview || updatedUserSlWallets) {
             return res.status(404).json({ error: 'Nie znaleziono użytkownika, prawdopodobnie nie grałeś u nas na serwerze, zapraszamy do gry' });
         }
          res.status(200).json({updatedClassSlOverview , updatedUserSlOverview, updatedUserSlWallets});
        }
      })
  
    } catch (error) {
      res.status(400).json({error: error.message})
    }
}