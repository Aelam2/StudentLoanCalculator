import dotenv from "dotenv";
import passport from "passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import LocalStrategy from "passport-local";
import { Users } from "../models/models";

dotenv.config();

//JSON WEB TOKEN STRATEGIRY
passport.use(
  new Strategy(
    {
      jwtFromRequest: ExtractJwt.fromHeader("authorization"),
      secretOrKey: process.env.JWT_SECRET
    },
    async (payload, done) => {
      try {
        // Find the user specified in token
        const user = await Users.findOne({ UserID: payload.sub });

        // If user doesn't exist, handle it
        if (!user) {
          return done(null, false);
        }

        // otherwise, return the user
        return done(null, user);
      } catch (err) {
        done(err, false);
      }
    }
  )
);

// LOCAL STRATEGY
passport.use(
  new LocalStrategy(
    {
      usernameField: "UserName",
      passwordField: "Password"
    },
    async (UserName, Password, done) => {
      try {
        // Find the User via their UserName
        let user = await Users.findOne({ UserName: UserName });

        // If not, Handle it
        if (!user) {
          return done(null, false);
        }

        // check if password is correct
        const isMatch = await user.isValidPassword(Password);

        // If not, handle it
        if (!isMatch) {
          return done(null, false);
        }
        // Otherwise, return the User
        return done(false, user);
      } catch (err) {
        done(err, false);
      }
    }
  )
);
