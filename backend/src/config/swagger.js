const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'CaseBud API Documentation',
            version: '1.0.0',
            description: 'API documentation for CaseBud backend services'
        },
        servers: [
            {
                url:
                    process.env.NODE_ENV === 'production'
                        ? process.env.API_URL
                        : `http://localhost:${process.env.PORT}`,
                description: 'Development server'
            }
        ],
        components: {
            schemas: {
                User: {
                    type: 'object',
                    properties: {
                        email: {
                            type: 'string',
                            format: 'email',
                            description: 'User email address'
                        },
                        fullName: {
                            type: 'string',
                            description: 'User full name'
                        },
                        password: {
                            type: 'string',
                            format: 'password',
                            description: 'User password'
                        },
                        isVerified: {
                            type: 'boolean',
                            description: 'Email verification status'
                        }
                    }
                },
                Document: {
                    type: 'object',
                    properties: {
                        name: {
                            type: 'string',
                            description: 'Document name'
                        },
                        type: {
                            type: 'string',
                            enum: ['pdf', 'doc', 'docx', 'txt'],
                            description: 'Document type'
                        },
                        url: {
                            type: 'string',
                            description: 'Document URL'
                        }
                    }
                },
                Error: {
                    type: 'object',
                    properties: {
                        status: {
                            type: 'string',
                            example: 'error'
                        },
                        message: {
                            type: 'string'
                        }
                    }
                }
            },
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            }
        }
    },
    apis: ['./src/routes/*.js']
};

module.exports = swaggerJsdoc(options);
