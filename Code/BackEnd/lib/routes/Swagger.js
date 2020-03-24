import express from "express";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
let router = express.Router();

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Student-Loan API",
      description: "Student-Loan Calculator API documentation",
      contact: {
        name: "James Elam"
      },
      servers: ["http://localhost:1337"]
    }
  },
  apis: ["../routes/*.js"]
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

router.route("/").get(swaggerUi.serve, swaggerUi.setup(swaggerDocs));

export default router;
