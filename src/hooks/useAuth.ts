export function useAuth() {
  return {
    user: null,
    session: null,
    loading: false,
    signIn: async () => {},
    signUp: async () => {},
    signOut: async () => {},
    resetPassword: async () => {}
  }
}
