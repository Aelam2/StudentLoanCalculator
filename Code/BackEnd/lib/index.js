import express from "express";
import bodyParser from "body-parser";
import passport from "passport";
import cors from "cors";
import auth from "./middleware/authentication";

import userNonAuthenticated from "./routes/UserNonAuthenticated";
import userAuthenticated from "./routes/UserAuthenticated";

import studentLoans from "./routes/StudentLoans";
import paymentPlans from "./routes/PaymentPlans";
import analytics from "./routes/Analytics";
import swagger from "./routes/Swagger";

const app = express();
const port = process.env.PORT || 1337;

var whitelist = process.env.CORS_WHITELIST && process.env.CORS_WHITELIST.split(",");
var corsOptions = {
  origin: function(origin, callback) {
    if (process.env.NODE_ENV === "development" || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
};
app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());

//Non-Authenticated routes
app.use("/", userNonAuthenticated);
app.use("/api-docs", swagger);

//Check if user is logged-in and set user object for global use
app.use(passport.authenticate("jwt", { session: false }));

//Logged-In Routes
app.use("/", userAuthenticated);
app.use("/me", studentLoans);
app.use("/me/loans", paymentPlans);
app.use("/me/loans", analytics);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

export default app;
