import { Strategy as SteamStrategy } from 'passport-steam';
import passport from 'passport'

passport.serializeUser((user, done) => {
	done(null, user);
});

passport.deserializeUser((user, done) => {
	done(null, user);
});

export default passport.use(
    new SteamStrategy({
    returnURL: 'http://localhost:5000/dashboard/auth/steam/return',
    realm: 'http://localhost:5000/',
    apiKey: '545455AE8B22D7BE31E431157C583BFB'

  }, (identifier: any, profile: any, done: any) => {
    console.log('identifier ', profile.id)
  
  
       done(null, profile);
  }
));