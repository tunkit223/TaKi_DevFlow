const ROUTES = {
  HOME: '/',
  SIGN_IN: '/sign-in',
  SIGN_UP: '/sign-up',
  ASK_QUESTION: '/ask-question',
  PROFILE: (id:string) => `/profile/${id}`,
  TAGS: (_id:string) => `/tags/${_id}`
}
export default ROUTES