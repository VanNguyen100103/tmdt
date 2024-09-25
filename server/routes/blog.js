const router = require("express").Router();
const ctrls = require('../controllers/blog');
const {verifyAccessToken, isAdmin} = require('../middlewares/verifyToken');
const {blogUploader} = require('../config/cloudinary.config');

router.get("/", ctrls.getBlogs)
router.post("/", [verifyAccessToken, isAdmin], ctrls.createNewBlog);
router.put("/image/:bid", [verifyAccessToken, isAdmin], blogUploader.single('image'),ctrls.uploadImageBlog)
router.put("/like/:bid", verifyAccessToken, ctrls.likeBlog)
router.put("/dislike/:bid", verifyAccessToken, ctrls.dislikeBlog)
router.get("/one/:bid",  ctrls.getBlog)
router.put("/:bid", [verifyAccessToken, isAdmin], ctrls.updateBlog);
router.delete("/:bid", [verifyAccessToken, isAdmin], ctrls.deleteBlog);

module.exports = router
