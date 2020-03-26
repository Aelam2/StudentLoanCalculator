import express from "express";
import { Users } from "../models/models";
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
 * /me:
 *  get:
 *    description: Create a new user
 *    tags: [Users]
 *    responses:
 *      '200':
 *        description: Successfully returned sign-in User's properties
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: string
 *                  example: success
 *                result:
 *                  type: object
 *                  $ref: '#/components/schemas/Users'
 *      '401':
 *        description: Username or Password incorrect
 *      '500':
 *         description: An unexpected error occured
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FiveHundredError'
 */
router.route("/me").get(async (req, res) => {
  try {
    let user = await Users.findOne({ where: { UserID: req.user.UserID } });

    if (!user) {
      res.status(404).send({
        status: "error",
        result: null,
        error: "User does not exist or has been deleted."
      });
    }
    res.status(user ? 200 : 404).send({
      status: user ? "success" : error,
      result: user ? user.toJSON() : null
    });
  } catch (err) {
    res.status(500).send({ status: "error", result: null, error: "an unexpected error occured" });
  }
});

router.route("/password-reset").post((req, res) => {
  try {
  } catch (err) {
    res.status(500).send({ status: "error", result: null, error: "an unexpected error occured" });
  }
});

export default router;
