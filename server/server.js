import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';

import express from 'express';
import http from 'http';

import schema from './peopleCarsScheme.js';

const startApolloServer = async (schema) => {
  const app = express();

  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  server.applyMiddleware({ app });

  await new Promise((resolve) => httpServer.listen({ port: 9000 }, resolve));

  console.log(`Server started!`);
};

startApolloServer(schema);
