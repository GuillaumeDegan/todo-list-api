import swaggerJSDoc from "swagger-jsdoc";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "My todo list API",
    version: "1.0.0",
    description: "Just a basic todo list api",
  },
};

const options = {
  swaggerDefinition,
  apis: ["./index.js", "./src/routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;
