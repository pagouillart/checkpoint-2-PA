"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const Country_1 = require("./entities/Country");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "sqlite",
    database: "countries.sqlite",
    synchronize: true,
    logging: false,
    entities: [Country_1.Country],
    migrations: [],
    subscribers: [],
});
