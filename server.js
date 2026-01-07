const express = require("express");
const todoRoutes = require("./routes/todoRoutes");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");

const swaggerDocument = YAML.load("./swagger.yaml");

const app = express();

app.use(express.json());

// Global handler for invalid JSON
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
        return res.status(400).json({
            error: "Invalid JSON format.Enter valid input."
        });
    }
    next();
});

// Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use("/todos", todoRoutes);

// Fallback for unknown routes
app.use((req, res) => {
    res.status(404).json({
        error: "Route not found"
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Todo API running on port ${PORT}`);
    console.log(`Swagger UI: http://localhost:${PORT}/api-docs`);
});
