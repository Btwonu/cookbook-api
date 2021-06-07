module.exports = {
  port: process.env.PORT || 5000,
  DB: {
    uri: 'mongodb://localhost:27017/cookbook-test2',
    options: { useNewUrlParser: true, useUnifiedTopology: true },
  },
};
