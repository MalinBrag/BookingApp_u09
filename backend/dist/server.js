"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("./config/db");
const user_routes_1 = __importDefault(require("./routes/user-routes"));
const admin_routes_1 = __importDefault(require("./routes/admin-routes"));
const flight_routes_1 = __importDefault(require("./routes/flight-routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
//middleware
app.use((0, cors_1.default)({
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express_1.default.json());
//database
(0, db_1.connect_db)().then(() => {
    //routes
    app.use('/api/user', user_routes_1.default);
    app.use('/api/admin', admin_routes_1.default);
    app.use('/api/flights', flight_routes_1.default);
    //start server
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}).catch(err => {
    console.error('error', err);
});
