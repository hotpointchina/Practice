const KoaRouter = require('koa-router');
const router = new KoaRouter();
const upload = require('../middlewares/upload');
const routerControl = require('../controller/routerControl');

// 处理一下，首页的情况，给一个跳转的 a 标签
router.get('/', routerControl.index);

// 获取数据库中所有的图片
router.get('/getPhotos', routerControl.getPhotos);

// 上传
router.post('/upload', upload(), routerControl.uploadimg);

module.exports = router;