import cors from "cors";
import express from "express";
import expressPlayground from "graphql-playground-middleware-express";
import { startGraphql } from "./startGraphql";

// Create a server:
const app = express();

app.use(cors<cors.CorsRequest>());
app.use(express.json());

app.get(
  "/playground",
  expressPlayground({
    endpoint: "/graphql",
    settings: {
      "schema.polling.enable": false,
    },
  })
);

// Start graphql server
startGraphql("http://localhost:4000/graphql", app);

// Start the server:
app.listen(8080, () => console.log("Server started on port 8080"));
