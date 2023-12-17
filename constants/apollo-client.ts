import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const httpLink = new HttpLink({
    uri: "https://localhost:3000/graphql",
    credentials: "same-origin"
})

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: httpLink
});

export default client;
