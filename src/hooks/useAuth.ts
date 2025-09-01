export function useAuth() {
  return {
    user: null,
    session: null,
    loading: false,
    signIn: async (_email: string, _password: string) => {},
    signUp: async (_email: string, _password: string) => {},
    signOut: async () => {},
    resetPassword: async () => {}
  }
}
