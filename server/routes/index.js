const userRouter = require('./user.js');
const productRouter = require('./product.js');
const productCategoryRouter = require('./productCategory.js');
const blogCategoryRouter = require('./blogCategory.js');
const blogRouter = require('./blog.js');
const brandRouter = require('./brand.js');
const orderRouter = require('./order.js');
const couponRouter = require('./coupon.js');
const {notFound, errHandler} = require('../middlewares/errHandler.js');

const initRoutes = (app) => {
  app.use("/api/user", userRouter)
  app.use("/api/product", productRouter)
  app.use("/api/blog", blogRouter)
  app.use("/api/brand", brandRouter)
  app.use("/api/coupon", couponRouter)
  app.use("/api/order", orderRouter)
  app.use("/api/prodcategory", productCategoryRouter)
  app.use("/api/blogcategory", blogCategoryRouter)
  app.use(notFound)
  app.use(errHandler)
}

module.exports = initRoutes
