

module.exports = (req, res, next) => {
    try{
      if(!req.session || !req.session.user){
        return res.status(401).json({
          you: 'shall not pass!'
        })
      } next()
    } catch(err){
      next(err)
    }
  
  };