import express, { NextFunction, Request, Response } from "express";
import cors from "cors"
import corsOptions from './config/corsOptions'
import bodyParser from "body-parser";
import createHttpError, { isHttpError } from "http-errors";
import fileRoutes from "./routes/file";
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';


const app = express();

app.use(cors(corsOptions));

app.use(express.json());
app.use(bodyParser.json());

app.use(
    express.urlencoded({ extended: true })
);
    

// routes 
app.use('/v1/file', fileRoutes);

app.get("/", (req, res) =>
    res.json({ success: true, message: "files upload api is running!" })
);

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "File Upload",
            version: "1.0.0",
            description: "Test/Production API for file upload",
        },
        servers: [
            { url: "http://localhost:5000" },
            { url: "https://tobams-fileupload.onrender.com", }
        ],
        components: {
            securitySchemes: {}
        },
        security: [{}],
        "tags": [
            {
                "name": "Files",
                "x-tagGroups": [
                    {
                        "key": "file",
                        "order": 1
                    }
                ]
            }
        ],
    },
    apis: ["src/swagger/*.ts"],
};


// Generate Swagger documentation
const specs = swaggerJsDoc(options);

// Serve Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));


app.use((req, res, next) => {
    next(createHttpError(404, "Endpoint not found"));
});


app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    console.error(error);
    let errorMessage = "Internal Server Error";
    let statusCode = 500;
    if (isHttpError(error)) {
        statusCode = error.status;
        errorMessage = error.message;
    }
    res.status(statusCode).json({ error: errorMessage });
});

export default app;
