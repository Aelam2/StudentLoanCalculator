import express from "express";
import bodyParser from "bodyParser";
import authentication from "./middleware/authentication";
import user from "./routes/User";
import studentLoans from "./routes/StudentLoans";
import paymentPlans from "./routes/PaymentPlans";
import analytics from "./routes/Analytics";
import swagger from "./routes/Swagger";

const app = express();
const port = process.env.PORT || 1337;

app.use(bodyParser);

//routes
app.use("/", user);
app.use("/me", studentLoans);
app.use("/me/student-loans", paymentPlans);
app.use("/me/student-loans", analytics);
app.use("/api-docs", swagger);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

export default app;
