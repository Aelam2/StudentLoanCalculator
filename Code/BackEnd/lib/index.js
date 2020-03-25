import express from "express";
import bodyParser from "body-parser";
import passport from "passport";

import users from "./routes/Users";
import studentLoans from "./routes/StudentLoans";
import paymentPlans from "./routes/PaymentPlans";
import analytics from "./routes/Analytics";
import swagger from "./routes/Swagger";

const app = express();
const port = process.env.PORT || 1337;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());

//routes
app.use("/", users);
app.use("/me", studentLoans);
app.use("/me/loans", paymentPlans);
app.use("/me/loans", analytics);
app.use("/api-docs", swagger);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

export default app;
