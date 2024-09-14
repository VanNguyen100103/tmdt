const userRouter = require('./user.js');
const {notFound, errHandler} = require('../middlewares/errHandler.js');

const initRoutes = (app) => {
  app.use("/api/user", userRouter)
  app.use(notFound)
  app.use(errHandler)
}

module.exports = initRoutes
