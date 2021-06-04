const swaggerJSDoc = require("swagger-jsdoc");

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Express API',
    version: '1.0.0',
    description:
      'This is a REST API application made with Express.',
  },
  servers: [
    {
      url: 'http://localhost',
      description: 'Local server',
    }
  ],
  components: {
    responses: {
      UnauthorizedError: {
        description: "Access token is missing or invalid",
      },
      badRequest: {
        description: "Bad request",
      },
      serverError: {
        description: "Internal Server Error",
      }
    },
    parameters: {
      authorization: {
        in: "header",
        name: "Authorization",
        schema: {
          type: "string"
        },
        required: true,
        description: "Unique Token"
      },
      page: {
        in: "query",
        name: "page",
        schema: {
          type: "integer",
          minimum: 1
        },
        description: "The number of page we want to access. First page is 1"
      },
      limit: {
        in: "query",
        name: "limit",
        schema: {
          type: "integer",
          minimum: 10,
          maximum: 100
        },
        description: "The size of the collection returned, minimum size 10 and maximum 100"
      }
    }
  }
};

const options = {
  swaggerDefinition,
  apis: ["./src/routes/*.js"]
};

module.exports = swaggerJSDoc(options);
