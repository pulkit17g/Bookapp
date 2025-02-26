import { ApolloClient, InMemoryCache, HttpLink, split } from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { getMainDefinition } from "@apollo/client/utilities";
import "react-native-url-polyfill/auto";
import { 
  HASURA_GRAPHQL_ENDPOINT, 
  HASURA_GRAPHQL_WS, 
  HASURA_ADMIN_SECRET 
} from '@env';

// HTTP Link for Queries & Mutations
const httpLink = new HttpLink({
    uri: HASURA_GRAPHQL_ENDPOINT,
    headers: {
      "x-hasura-admin-secret": HASURA_ADMIN_SECRET,
    },
  });
  
  // WebSocket Link for Subscriptions (using graphql-ws)
  const wsLink = new GraphQLWsLink(
    createClient({
      url: HASURA_GRAPHQL_WS,
      connectionParams: {
        headers: {
          "x-hasura-admin-secret": HASURA_ADMIN_SECRET,
        },
      },
    })
  );
  
  // Use split to route queries/mutations over HTTP and subscriptions over WebSocket
  const link = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return definition.kind === "OperationDefinition" && definition.operation === "subscription";
    },
    wsLink,
    httpLink
  );
  
  // Create Apollo Client
  const client = new ApolloClient({
    link,
    cache: new InMemoryCache(),
  });
  
  export default client;