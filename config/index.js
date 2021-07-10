module.exports = {
  port: process.env.PORT || 5000,
  DB: {
    uri: process.env.DB_URI,
    options: { useNewUrlParser: true, useUnifiedTopology: true },
  },
  cookie:
    process.env.NODE_ENV === 'production'
      ? {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
          sameSite: 'none',
          secure: true,
        }
      : {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
        },
};

// {
//   httpOnly: true,
//   maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
//   sameSite: 'none',
//   secure: true,
// }
