const models = require('../models');
const Promise = require('bluebird');

module.exports.createSession = (req, res, next) => {

  Promise.resolve(req.cookies.shortlyid)
  .then(hash => {
    if (!hash) {
      throw hash;
    }
    return models.Sessions.get({ hash });
  })
  .tap(session => {
    if (!session) {
      throw session;
    }
  })
  // initializes a new session
  .catch(() => {
    return models.Sessions.create()
      .then(results => {
        return models.Sessions.get({ id: results.insertId });
      })
      .tap(session => {
        res.cookie('shortlyid', session.hash);
      });
  })
  .then(session => {
    req.session = session;
    next();
  });
};


  // if(!req.headers.cookie){
  //   models.Sessions.create()
  //     .then((input) =>{
  //       //console.log(models.Sessions.get())
  //       return models.Sessions.get({id: input.insertId})
  //     })
  //     .then((session) =>{
  //       throw session
  //     })
  //     .error((err) =>{
  //      // console.log(err)
  //       next()
  //     })
  //     .catch((session) =>{
  //       req.session = session
  //       res.cookie('shortlyid', session.hash)
  //       next()
  //     })
  // }
// };






/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/

module.exports.verifySession = (req, res, next) => {
  if (!models.Sessions.isLoggedIn(req.session)) {
    res.redirect('/login');
  } else {
    next();
  }
};