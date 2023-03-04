import { Amplify, Auth } from 'aws-amplify';
import awsconfig from '../amplify/aws-exports';

export default defineNuxtPlugin((nuxtApp) => {
  Amplify.configure(awsconfig);
});
