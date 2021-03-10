const dev = process.env.NODE_ENV !== 'production'

export const server = dev ? 'http://localhost:3000' : 'https://cosc-499-pace-a-staging.herokuapp.com'
