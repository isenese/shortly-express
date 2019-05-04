const parseCookies = (req, res, next) => {
  if(req.headers.cookie){
    req.cookies = {}
    let cookieSplit = req.headers.cookie.split('; ')
      .map((cookie) =>{
        return cookie.split('=')
      })
    cookieSplit.forEach((cookie) =>{
      req.cookies[cookie[0]] = cookie[1]
    })
  } else {
    req.cookies = {}
  }
  next()
};

module.exports = parseCookies;