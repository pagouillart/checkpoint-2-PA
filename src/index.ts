import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";
import { CountryResolver } from "./resolvers/CountryResolver";
import { AppDataSource } from "./data-source";

async function main() {
  await AppDataSource.initialize();
  console.log("Bdd ok");

  const schema = await buildSchema({
    resolvers: [CountryResolver],
    validate: false,
  });

  const server = new ApolloServer({ schema });

  const { url } = await server.listen({ port: 8081 });
  console.log(`Serveur ok sur ${url}`);
}
main().catch((error) => {
    console.error("Erreur serveur :", error);
  });