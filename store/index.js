export const state = () => ({
  user: {
    email: 'test@example.com'
  }
})

export const getters = {
  isAuthenticated (state) {
    return !!state.user
  }
}