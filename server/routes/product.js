const router = require('express').Router();
const ctrls = require('../controllers/product');
const {verifyAccessToken, isAdmin} = require('../middlewares/verifyToken');
const {productUploader} = require('../config/cloudinary.config');

router.post("/", [verifyAccessToken, isAdmin], ctrls.createProduct)
router.put("/ratings", verifyAccessToken, ctrls.ratings)
router.put("/uploadimage/:pid", [verifyAccessToken, isAdmin], productUploader.array('images', 10), ctrls.uploadImagesProduct)
router.put("/:pid", [verifyAccessToken, isAdmin], ctrls.updateProduct)
router.delete("/:pid", [verifyAccessToken, isAdmin], ctrls.deleteProduct)
router.get("/", ctrls.getProducts)
router.get("/:pid", ctrls.getProduct)


module.exports = router;