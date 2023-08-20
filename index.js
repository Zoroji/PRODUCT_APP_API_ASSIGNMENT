const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const authMiddleWare = require("./middleware/authMiddleWare");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const app = express();

app.use(bodyParser.json());


mongoose.connect("mongodb+srv://ZoroBhai:ZoroKreCRUD@crud.pmvr5up.mongodb.net/PRODUCT_API", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("Connected to MongoDB");

  
    app.listen(5000, () => {
        console.log("Server is running on port 5000");
    });
})
.catch(error => {
    console.error("Error connecting to MongoDB:", error);
});



// swagger

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Product API using Express",
            version: "1.0.0",
            description: "Documentation for using this API for your product app"
        }
    },
        servers: [
            {
                url: "http://localhost:5000/",
            }
        ],
        apis: [
            './route/*.js' 
        ]
    
};


const swaggerSpec = swaggerJSDoc(swaggerOptions);

app.use("/api-doc",swaggerUi.serve,swaggerUi.setup(swaggerSpec));




app.use("/categories",require("./route/Categories"));
app.use("/product",require("./route/Product"));
app.use("/product_by_cat",require("./route/ProductByCategory"));
// app.use("/cart",authMiddleWare,require("./route/Cart"));
app.use("/cart",require("./route/Cart"));
// app.use("/orders",authMiddleWare,require("./route/Orders"));
app.use("/orders",require("./route/Orders"));
app.use("/users",require("./route/User"));
