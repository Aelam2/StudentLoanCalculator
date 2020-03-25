import passport from "passport";
import { ExtractJwt, Strategy } from "passport-jwt";

passport.use(
  new Strategy(
    {
      jwtFromRequest: ExtractJwt.fromHeader("authorization"),
      secretOrKey: process.env.JWT_SECRET
    },
    async (payload, done) => {}
  )
);
