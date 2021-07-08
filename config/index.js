module.exports = {
  port: process.env.PORT || 5000,
  DB: {
    uri: process.env.DB_URI,
    options: { useNewUrlParser: true, useUnifiedTopology: true },
  },
};
