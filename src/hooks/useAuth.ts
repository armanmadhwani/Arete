export function useAuth() {
  return {
    user: null,
    session: null,
    loading: false,
    signIn: async (email: string, password: string) => {},
    signUp: async (email: string, password: string) => {},
    signOut: async () => {},
    resetPassword: async () => {}
  }
}
