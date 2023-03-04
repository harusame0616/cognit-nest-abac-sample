export const positions = ['STAFF', 'MANAGER'] as const;
export type Position = (typeof positions)[number];

export type AuthUser = {
  position?: Position;
  storeCode?: string;
  credentials: string;
};

export type Auth = {
  signIn(email: string, password: string): Promise<AuthUser | null>;
  refreshUser(): Promise<void>;
  isSignedIn(): boolean;
  user: AuthUser | null;
};
