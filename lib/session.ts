if (!process.env.SESSION_PASSWORD) {
  throw new Error('SESSION_PASSWORD environment variable not set')
}

export const sessionOptions = {
  password: process.env.SESSION_PASSWORD,
  cookieName: 'elmas-app-session-cookie',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
}
