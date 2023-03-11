import { Amplify } from 'aws-amplify';

export default defineNuxtPlugin(() => {
  Amplify.configure({
    Auth: {
      region: 'ap-nourtheast-1',
      userPoolId: 'ap-northeast-1_losjmWWev',
      userPoolWebClientId: '76bl8nf0j6a34ck5jmbnn3gqim',
    },
    ssr: true,
  });
});
