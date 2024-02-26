const {Router} = require("express");
const {categoryController, productController} = require("../controllers")
const router = Router();

// Categorias
router.post('/category/add', categoryController.addCategory);
router.get('/category/list', categoryController.getAllCategories);
router.get('/category/search/:id', categoryController.getCategory);
router.put('/category/update/:id', categoryController.updateCategory);
router.delete('/category/delete/:id', categoryController.deleteCategory);

// Productos
router.post('/product/add', productController.addProduct);
router.get('/product/list', productController.getAllProducts);
router.get('/product/search/:id', productController.getProduct);
router.put('/product/update/:id', productController.updateProduct);
router.delete('/product/delete/:id', productController.deleteProduct);

module.exports = router;