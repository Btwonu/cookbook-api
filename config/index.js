module.exports = {
  port: process.env.PORT || 3000,
  DB: {
    uri: 'mongodb://localhost:27017/cookbook-test',
    options: { useNewUrlParser: true, useUnifiedTopology: true },
  },
};
