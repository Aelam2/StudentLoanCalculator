import express from "express";
import { Users, Sequelize } from "../models/models";
import { validateSignUp, signUserToken } from "../helpers/userHelper";
let router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management (CRUD)
 */

/**
 * @swagger
 *
 * /sign-up:
 *  post:
 *    description: Create a new user
 *    tags: [Users]
 *    responses:
 *      '200':
 *        description: New user account was successfully created
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                token:
 *                  type: string
 *                  description: token used for logged-in requests
 *      '409':
 *        description: Email or Username has already been used
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *                  description: sign-up confliction error
 *      '500':
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FiveHundredError'
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - UserName
 *              - Password
 *              - Email
 *            properties:
 *              UserName:
 *                type: string
 *                required: true
 *                description: User inputted value used for future logins
 *              Password:
 *                type: string
 *                format: password
 *                required: true
 *                description: Hashed user password, is required
 *              Email:
 *                type: string
 *                format: email
 *                description: Email for the user, needs to be unique.
 *              FirstName:
 *                type: string
 *                nullable: true
 *                description: User's First Name.
 *              LastName:
 *                type: string
 *                nullable: true
 *                description: User's Last Name.
 */
router.route("/sign-up").post(async (req, res) => {
  try {
    let { UserName, Password, FirstName, LastName, Email } = req.body;

    //check if UserName or Email already exists
    let doesExist = await validateSignUp({ UserName, Email });
    if (doesExist) {
      return res.status(409).json({ error: doesExist });
    }

    //Create new user
    const newUser = await Users.create({ UserName, Password, FirstName, LastName, Email });
    await newUser.save();

    const token = signUserToken(newUser);

    //respond with token
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).send({ status: "error", error });
  }
});

/**
 * @swagger
 *
 * /login:
 *  post:
 *    description: Returns a JWT token that is required for logged-in routes.
 *    tags: [Users]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Users'
 *      responses:
 *        "200":
 *          description: A user schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Users'
 */
router.route("/login").post((req, res) => {
  try {
    const token = signUserToken(req.user);

    res.status(200).json({ token });
  } catch (err) {
    res.status(500).send({ status: "error", error: err });
  }
});

router.route("/password-reset").post((req, res) => {
  try {
  } catch (err) {
    res.status(500).send({ status: "error", error: err });
  }
});

router.route("/me").get(async (req, res) => {
  try {
    let user = await Users.findOne({ where: { UserID: 1 } });

    res.status(200).send({
      status: "success",
      data: user.toJSON(),
      msg: ""
    });
  } catch (err) {
    res.status(500).send({ status: "error", msg: "an unexpected error occured" });
  }
});

export default router;
