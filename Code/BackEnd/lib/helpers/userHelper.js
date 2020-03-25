import JWT from "jsonwebtoken";
import { Users, Sequelize } from "../models/models";
const Op = Sequelize.Op;

const validateSignUp = async ({ UserName, Email }) => {
  try {
    //check is username or email already exists
    const foundUser = await Users.findOne({
      where: { [Op.or]: [{ Email }, { UserName }] }
    });

    let error = false;
    if (foundUser) {
      error = "Email is already in use";
      if (foundUser.UserName.toLowerCase() == UserName.toLowerCase()) {
        error = "UserName is already in use";
      }
    }

    return error;
  } catch (err) {
    throw new Error(err);
  }
};

const signUserToken = user => {
  return JWT.sign(
    {
      iss: "loan-calculator", // issuer
      sub: user.UserID, // associate new user with this JWT token
      iat: new Date().getTime(), // current time
      exp: new Date().setDate(new Date().getDate() + 1) // Expire after current time + 1 day ahead
    },
    process.env.JWT_SECRET
  );
};

export { validateSignUp, signUserToken };
