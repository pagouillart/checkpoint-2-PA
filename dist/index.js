"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const apollo_server_1 = require("apollo-server");
const type_graphql_1 = require("type-graphql");
const CountryResolver_1 = require("./resolvers/CountryResolver");
const data_source_1 = require("./data-source");
async function main() {
    await data_source_1.AppDataSource.initialize();
    console.log("Bdd ok");
    const schema = await (0, type_graphql_1.buildSchema)({
        resolvers: [CountryResolver_1.CountryResolver],
        validate: false,
    });
    const server = new apollo_server_1.ApolloServer({ schema });
    const { url } = await server.listen({ port: 8081 });
    console.log(`Serveur ok sur ${url}`);
}
main().catch((error) => {
    console.error("Erreur serveur :", error);
});
