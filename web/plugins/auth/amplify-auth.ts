import { withSSRContext, Auth as AwsAuth } from 'aws-amplify';
import { Auth, AuthUser } from './auth';

export class AmplifyAuth implements Auth {
  private readonly auth: typeof AwsAuth;
  private _user: AuthUser;

  constructor(context: Parameters<typeof withSSRContext>[0]) {
    const { Auth } = withSSRContext(context);
    this.auth = Auth;
    this._user = { isSignedIn: false };
  }

  isSignedIn(): boolean {
    return !!this._user;
  }

  async signIn(email: string, password: string) {
    await this.auth.signIn(email, password);
    await this.refreshUser();

    return this.user;
  }

  async refreshUser() {
    try {
      const currentAuth = await this.auth.currentAuthenticatedUser();
      this._user = {
        ...currentAuth.attributes,
        credentials: currentAuth.signInUserSession.idToken.jwtToken,
        isSignedIn: true,
      } as AuthUser;
    } catch (e) {
      this._user = { isSignedIn: false };
    }
  }

  get user() {
    return { ...this._user };
  }
}
