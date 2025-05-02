import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API de Gestión de Tareas',
    version: '1.0.0',
    description: 'Documentación de la API para la prueba técnica en Node.js',
  },
  servers: [
    {
      url: 'http://localhost:3000/api',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      }
    }
  },
  security: [
    {
      bearerAuth: []
    }
  ]
};


const options = {
  swaggerDefinition,
  apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
