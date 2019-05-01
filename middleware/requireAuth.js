const passport = require('passport');

module.exports = () => {
  console.log('asdsadasdsahgjjhkajhksdgjhsdafgasdgjhfsgdaflg')
  return passport.authenticate(['jwt'], {
    session: false
  });
};
