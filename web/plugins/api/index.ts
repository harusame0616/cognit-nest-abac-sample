import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  NormalizedCache,
  NormalizedCacheObject,
} from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';

export default defineNuxtPlugin((nuxtApp) => {
  const httpLink = createHttpLink({
    // TODO: URL 動的にする
    uri: 'http://localhost:3000/graphql',
  });

  const authLink = setContext((_, { headers }) => {
    if (!nuxtApp.$auth.user.value.isSignedIn) {
      return headers;
    }

    const token = nuxtApp.$auth.user.value.credentials;
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  return {
    provide: {
      api: client,
    },
  } as const;
});

declare module '#app' {
  interface NuxtApp {
    $api: ApolloClient<NormalizedCacheObject>;
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $api: ApolloClient<NormalizedCacheObject>;
  }
}
