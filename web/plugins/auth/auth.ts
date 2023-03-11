export const positions = ['STAFF', 'MANAGER'] as const;
export type Position = (typeof positions)[number];

export type AuthenticatedUser = {
  isSignedIn: true;
  position?: Position;
  storeCode?: string;
  credentials: string;
};

export type NoAuthenticatedUser = {
  isSignedIn: false;
};

export type AuthUser = AuthenticatedUser | NoAuthenticatedUser;

export type Auth = {
  signIn(email: string, password: string): Promise<AuthUser | null>;
  refreshUser(): Promise<void>;
  isSignedIn(): boolean;
  user: AuthUser;
};
