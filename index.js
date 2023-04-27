import { registerRootComponent } from "expo";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import "react-native-gesture-handler";

import App from "./App";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { development } from "./src/constants/env";

let uri;

if (development === "local") uri = "http://localhost:4000/graphql";
else uri = "https://trainingapp-api-nodejs.vercel.app/graphql";



const httpLink = createHttpLink({
  uri: uri,
});

const authLink = setContext(async (_, { headers }) => {
  const token = await AsyncStorage.getItem("@token");
  return {
    headers: {
      ...headers,
      authorization: token || "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    fetchOptions: {
      credentials: "include",
    },
  }),
});

registerRootComponent(() => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
));
