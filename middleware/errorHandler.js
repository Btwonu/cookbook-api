module.exports = (err, req, res, next) => {
  err.message = err.message || 'Something went wrong.';
  err.status = err.status || 500;

  console.error('Error Handler: ' + err.message);
  res.status(err.status).render('500', { error: err });
};
