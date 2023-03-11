import { AmplifyAuth } from './amplify-auth';
import { Auth, AuthUser } from './auth';

const authPlugin = async () => {
  const auth: Auth = new AmplifyAuth({
    req: useRequestEvent()?.node?.req,
  });
  await auth.refreshUser();

  const user = ref<AuthUser>(auth.user);

  return {
    provide: {
      auth: {
        async signIn(email: string, password: string) {
          const _user = await auth.signIn(email, password);
          if (_user) {
            user.value = _user;
          } else {
            throw new Error('ログインに失敗しました。');
          }
        },
        user,
      },
    },
  } as const;
};

type AuthPlugin = Awaited<ReturnType<typeof authPlugin>>['provide']['auth'];

declare module '#app' {
  interface NuxtApp {
    $auth: AuthPlugin;
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $auth: AuthPlugin;
  }
}

export default defineNuxtPlugin(authPlugin);
