import express from "express";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
let router = express.Router();

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Student-Loan API",
      version: "1.0.0",
      description: "Student-Loan Calculator API documentation",
      contact: {
        name: "James Elam",
        email: "James@alexelam.dev"
      }
    },
    host: `${process.env.API_HOST}:${process.env.PORT}`,
    basePath: `${process.env.API_BASEPATH}`,
    components: {
      securitySchemes: {
        JWT: {
          type: "apiKey",
          in: "header",
          name: "Authorization",
          description: ""
        }
      }
    },
    security: [
      {
        JWT: []
      }
    ]
  },
  apis: ["lib/models/models/*.js", "lib/routes/*.js"]
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

router
  .use(swaggerUi.serve)
  .route("/")
  .get(swaggerUi.setup(swaggerDocs, { explorer: true }));

export default router;

/**
 * @swagger
 * components:
 *    schemas:
 *      FourZeroOne:
 *        description: User failed to authenticate
 *        type: object
 *      FourZeroNineError:
 *        description: An unexpected error occured in the application
 *        type: object
 *        properties:
 *          error:
 *            type: string
 *            description: User-friendly description of unique-constraint error in application
 *          codeName:
 *            type: string
 *            description: field where the unique-constraint error occured
 *          value:
 *            type: string
 *            description: value that triggered the unique-constraint error
 *      FourTwentyTwoError:
 *        description: An unexpected error occured in the application
 *        type: object
 *        properties:
 *          error:
 *            type: string
 *            description: User-friendly description of validation error in application
 *          codeName:
 *            type: string
 *            description: field where the validation error occured
 *          value:
 *            type: string
 *            description: value that triggered the validation error
 *      FiveHundredError:
 *        description: An unexpected error occured in the application
 *        type: object
 *        properties:
 *          error:
 *            type: string
 *            description: Description of error in application
 */
